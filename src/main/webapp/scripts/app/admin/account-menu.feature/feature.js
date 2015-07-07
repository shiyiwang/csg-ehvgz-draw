define(['jquery', 'underscore'], function($, _) {
    return {
        layout: {
            regions: {
                help: 'help',
                title: 'title',
                dropdown: 'dropdown'
            }
        },
        views: [{
            name: 'inline:help',
            region: 'help',
            events: {
                'click': 'downloadHelp'
            }
        }, {
            name: 'inline:title', region: 'title', avoidLoadingHandlers: true
        }, {
            name: 'inline:dropdown', region: 'dropdown', avoidLoadingHandlers: true
        }]
    };
});
