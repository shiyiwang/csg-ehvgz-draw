define([
    'jquery',
    'cdeio/core/loader-plugin-manager',
    'app/commons/export-excel.feature/export-excel-function',
], function ($, LoaderManager, exportUtil) {
    return {
        renderers: {
            modifyTime: function(data) {

                return data.substring(0,16);
            },
            modifyNum: function(data) {

                return '<font color="red">' + data + '</font>';
            }
        },
        handlers: {
            draw: function(){
                var me = this,
                    grid = me.feature.views['grid:body'].components[0];


                me.feature.request({
                    url: 'get-sortition-num',
                    type: 'get'
                }).done(function (result){

                    console.log('result', result);

                    if (result.flag == false){
                        app.error('已经抽过签，禁止再次抽签！');
                        return false;
                    }

                    app.confirm('确定要进行抽签吗?', function(confirmed) {
                        if (confirmed) {

                            me.feature.request({
                                url: 'draw-project-info',
                                type: 'get'
                            }).done(function (result){
                                grid.refresh();
                                app.success('抽签成功！');
                            });
                            return true;
                        }
                        return;
                    });
                });
            },
            exportExcel: function(){
                var me = this;

                exportUtil.exportSelectedToExcel(me);
            }
        }
    };
});
