var {mark} = require('cdeio/mark');
var _      = require('underscore');

var {createService}     = require('draw/project-info.feature/service');
var {SecurityUtils}     = org.apache.shiro;
var {json, error, html} = require('cdeio/response');
var {ProjectInfo}       = com.zyeeda.draw.project.entity;

exports.service = function(service){
    return _.extend(service, createService());
};

exports.entityLabel = '抽签';

exports.enableFrontendExtension = true;

exports.labels = {
    name: '项目名称',
    unit: '所属单位',
    sortitionNum: '签号',
    sortitionTime: '抽签时间'
};

exports.filters = {
    defaults: {
        '!projectInfoFilter': ''
    },
    list: {
        '!projectInfoFilter': ''
    }
};

exports.style = 'grid';

exports.grid = {
    numberColumn: true,
    columns: [
        {name: 'unit', defaultContent: '', width: 100},
        {name: 'name', defaultContent: '',width: 150},
        {name: 'sortitionNum', defaultContent: '', width: 50, renderer: 'modifyNum'},
        {name: 'sortitionTime', defaultContent: '', width: 60, renderer: 'modifyTime'}
    ],
    defaultOrder: 'importTime-desc',
    multiple: true
};

// 导出 excel 相关配置
exports.exporting = {
    template: 'draw/project-info/projectInfoExportModule.xls',
    fileName: '项目信息表'
};

exports.operators = {
    add: false,
    edit: false,
    show: false,
    del: false,
    draw: {label: '抽签', icon: 'icon-stackexchange', group: '30-custom', order: 100, show: 'always', style: 'btn-info' },
    exportExcel: { label: '导出', icon: 'zicon-outexcel', group: '30-refresh', order: 200, show: 'always', style: 'btn-primary' }
};

exports.doWithRouter = function(router) {
    router.get('/draw-project-info', mark('services', 'draw/project-info').on(function (projectInfoSvc, request) {

        projectInfoSvc.drawProjects();

        return json({flag: true});
    }));

    //导出到Excel
    router.get('/export-excel', mark('services', 'commons/export-excel', 'draw/project-info').on(function (exportXlsSvc, projectInfoSvc, request) {
        var options = request.params,
            result;

        options = exportXlsSvc.dealParameters(options, projectInfoSvc, new ProjectInfo());

        result = projectInfoSvc.exportExcel(options, exports.exporting.template, exports.exporting.fileName);

        return json({flag: result.flag, filename: result.filename});
    }));
};
