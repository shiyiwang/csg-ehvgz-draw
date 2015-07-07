var {mark}          = require('cdeio/mark');
var _               = require('underscore');
var {createService} = require('cdeio/service');
var {createManager} = require('cdeio/manager');
var commExpService  = require('commons/export-excel.feature/service');

var {ProjectInfo}        = com.zyeeda.draw.project.entity;
var {Account}            = com.zyeeda.cdeio.commons.organization.entity;
var {EntityMetaResolver} = com.zyeeda.cdeio.web.scaffold;

var {SecurityUtils}      = org.apache.shiro;
var {SimpleDateFormat}   = java.text;
var {ArrayList}          = java.util;
var {HashMap}            = java.util;
var {Date}               = java.util;

exports.createService = function() {
    return {
        list: mark('beans', EntityMetaResolver).mark('managers', Account).mark('tx').on(function (resolver, accountMgr, entity, options) {
            var meta = resolver.resolveEntity(ProjectInfo),
                projectInfoMgr = createManager(meta.entityClass),
                currentUser = SecurityUtils.getSubject().getPrincipal(),
                account;

            account = accountMgr.find(currentUser.id);

            options.filters = options.filters || [];

            if (account.department && "" !== account.department.name){
                options.filters.push(['eq', 'unit', account.department.name]);
            }

            if (options.filters) {
                fetchResult = projectInfoMgr.findByEntity(options);
            } else {
                fetchResult = projectInfoMgr.findByExample(entity, options);
            }

            return fetchResult;
        }),
        drawProjects: mark('managers', ProjectInfo).mark('tx').on(function (projectInfoMgr) {
            var currentUser = SecurityUtils.getSubject().getPrincipal(),
                count = 0,
                numArr = [],
                sortedNum,
                sortedNumArr = [],
                canSortArr,
                projectInfos,
                projectInfo;

            //项目的总数
            count = projectInfoMgr.getMaxCountOfProjectInfos({}, 1);

            //获取已有的签号
            sortedNum = projectInfoMgr.getSortitionNum();

            //根据用户单位获取没有取得签号的项目信息，准备录入签号
            projectInfos = projectInfoMgr.getprojectInfosByUnit({unit: currentUser.department.name});

            //从数据库中获取已经用过的签号组成一个数组
            for(var i = 0; i < sortedNum.size(); i++) {
                sortedNumArr.push(sortedNum.get(i));
            }

            //生成签号的数组
            for(var i = 1; i <= count; i++){
                numArr.push(i);
            }

            //排除已经用过的签号并乱序
            canSortArr = _.difference(numArr, sortedNumArr);
            canSortArr = _.shuffle(canSortArr);

            for (var i = 0; i < projectInfos.size(); i++) {
                projectInfo = projectInfos.get(i);
                projectInfo.sortitionNum = canSortArr[i];
                projectInfo.sortitionTime = new Date();
            };
        }),
        //导出
        exportExcel: mark('beans', EntityMetaResolver).on(function (resolver, options, exportModule, exportFileName) {
            var beans = new HashMap(),
                vo, vos = new ArrayList(),
                entity, entities,
                i, j,
                meta = resolver.resolveEntity(ProjectInfo),
                dateTimeStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),
                dateSdf = new SimpleDateFormat("yyyy-MM-dd"),
                meta = resolver.resolveEntity(ProjectInfo),
                projectInfoMgr = createManager(meta.entityClass);

            if (null != options.selectedDataId){
                entities = projectInfoMgr.getProjectInfosBySelectedIds({selectedIds: options.selectedDataId});
            }else {
                entities = commExpService.createService().listEntities(options, meta);
            }

            for (i = 0; i < entities.size(); i++) {
                entity = entities.get(i);

                vo = commExpService.createService().convertEntityToObj(entity);

                vo.index = i + 1;
                vo.sortitionTime = (entity.sortitionTime === null) ? entity.sortitionTime : dateSdf.format(entity.sortitionTime);
                vos.add(vo);
            }

            beans.put('projectInfos', vos);
            beans.put('footer', '操作时间:' + dateTimeStr);

            return commExpService.createService().exportExcel(beans, exportModule, exportFileName);
        })
    };
};
