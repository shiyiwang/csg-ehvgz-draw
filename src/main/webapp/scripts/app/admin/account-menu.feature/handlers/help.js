define({
    downloadHelp: function(e) {
        var $ifrm;

        $ifrm = $('<iframe></iframe>');
        $ifrm.css({
            width: '0px',
            height: '0px',
            display: 'none'
        });
        $ifrm.attr('onload', function() {
            return setTimeout(function() {
                return $ifrm.remove();
            }, 1000);
        });
        $ifrm.attr('src', 'invoke/system/upload/down-help/' + encodeURIComponent('工作包管理系统操作手册.doc'));

        return $(document.body).append($ifrm);
    }
});
