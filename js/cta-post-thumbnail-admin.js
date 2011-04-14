function CtaPluginSetThumbnailHTML(html, id, post_type){
	jQuery('.inside', '#' + post_type + '-' + id).html(html);
};

function CtaPluginSetThumbnailID(thumb_id, id, post_type){
	var field = jQuery('input[value=_' + post_type + '_' + id + '_thumbnail_id]', '#list-table');
	if ( field.size() > 0 ) {
		jQuery('#meta\\[' + field.attr('id').match(/[0-9]+/) + '\\]\\[value\\]').text(thumb_id);
	}
};

function CtaPluginRemoveThumbnail(id, post_type, nonce){
	jQuery.post(ajaxurl, {
		action:'set-' + post_type + '-' + id + '-thumbnail', 
		post_id: jQuery('#post_ID').val(), 
		thumbnail_id: -1, 
		_ajax_nonce: nonce, 
		cookie: encodeURIComponent(document.cookie)
		}, 
		function(str){
			if ( str == '0' ) {
				alert( setPostThumbnailL10n.error );
			} else {
				CtaPluginSetThumbnailHTML(str, id, post_type);
			}
		}
	);
};


function CtaPluginSetAsThumbnail(thumb_id, id, post_type, nonce){
	var $link = jQuery('a#' + post_type + '-' + id + '-thumbnail-' + thumb_id);

	$link.text( setPostThumbnailL10n.saving );
	jQuery.post(ajaxurl, {
		action:'set-' + post_type + '-' + id + '-thumbnail', post_id: post_id, thumbnail_id: thumb_id, _ajax_nonce: nonce, cookie: encodeURIComponent(document.cookie)
	}, function(str){
		var win = window.dialogArguments || opener || parent || top;
		$link.text( setPostThumbnailL10n.setThumbnail );
		if ( str == '0' ) {
			alert( setPostThumbnailL10n.error );
		} else {
			$link.show();
			$link.text( setPostThumbnailL10n.done );
			$link.fadeOut( 2000, function() {
				jQuery('tr.' + post_type + '-' + id + '-thumbnail').hide();
			});
			win.CtaPluginSetThumbnailID(thumb_id, id, post_type);
			win.CtaPluginSetThumbnailHTML(str, id, post_type);
		}
	}
	);
}

// This function saves the link to the post meta data
function CtaPluginSaveLink(post_id, nonce) {
	var link = jQuery('#sponsor_link').val();
	jQuery('#save_sponsor_link').toggle();
	jQuery('#ctapt_status').html(" Saving...").toggle(true);
	
	jQuery.post(ajaxurl, {
		action:'set_link', 
		post_id: jQuery('#post_ID').val(), 
		sponsor_link: link,
		_ajax_nonce: nonce
		}, 
		function(data, textStatus){
			jQuery('#save_sponsor_link').toggle();
			jQuery('#ctapt_status').html(' Success!').fadeOut(2000);
		}
	);
}