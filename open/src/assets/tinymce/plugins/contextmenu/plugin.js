(function() {
	var contextmenu = (function() {
		'use strict';

		var Cell = function(initial) {
			var value = initial;
			var get = function() {
				return value;
			};
			var set = function(v) {
				value = v;
			};
			var clone = function() {
				return Cell(get());
			};
			return {
				get: get,
				set: set,
				clone: clone
			};
		};

		var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

		var get = function(visibleState) {
			var isContextMenuVisible = function() {
				return visibleState.get();
			};
			return { isContextMenuVisible: isContextMenuVisible };
		};
		var $_78h1xcasjkmcwod8 = { get: get };

		var shouldNeverUseNative = function(editor) {
			return editor.settings.contextmenu_never_use_native;
		};
		var getContextMenu = function(editor) {
			return editor.getParam(
				'contextmenu',
				'link openlink image inserttable | cell row column deletetable'
			);
		};
		var $_58lvimaujkmcwoda = {
			shouldNeverUseNative: shouldNeverUseNative,
			getContextMenu: getContextMenu
		};

		var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

		var getUiContainer = function(editor) {
			return global$1.DOM.select(editor.settings.ui_container)[0];
		};

		var nu = function(x, y) {
			return {
				x: x,
				y: y
			};
		};
		var transpose = function(pos, dx, dy) {
			return nu(pos.x + dx, pos.y + dy);
		};
		var fromPageXY = function(e) {
			return nu(e.pageX, e.pageY);
		};
		var fromClientXY = function(e) {
			return nu(e.clientX, e.clientY);
		};
		var transposeUiContainer = function(element, pos) {
			if (
				element &&
				global$1.DOM.getStyle(element, 'position', true) !== 'static'
			) {
				var containerPos = global$1.DOM.getPos(element);
				var dx = containerPos.x - element.scrollLeft;
				var dy = containerPos.y - element.scrollTop;
				return transpose(pos, -dx, -dy);
			} else {
				return transpose(pos, 0, 0);
			}
		};
		var transposeContentAreaContainer = function(element, pos) {
			var containerPos = global$1.DOM.getPos(element);
			return transpose(pos, containerPos.x, containerPos.y);
		};
		var getPos = function(editor, e) {
			if (editor.inline) {
				return transposeUiContainer(
					getUiContainer(editor),
					fromPageXY(e)
				);
			} else {
				var iframePos = transposeContentAreaContainer(
					editor.getContentAreaContainer(),
					fromClientXY(e)
				);
				return transposeUiContainer(getUiContainer(editor), iframePos);
			}
		};
		var $_alg35gavjkmcwodb = { getPos: getPos };

		var global$2 = tinymce.util.Tools.resolve('tinymce.ui.Factory');

		var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');

		var renderMenu = function(editor, visibleState) {
			var menu, contextmenu;
			var items = [];
			contextmenu = $_58lvimaujkmcwoda.getContextMenu(editor);
			global$3.each(contextmenu.split(/[ ,]/), function(name) {
				var item = editor.menuItems[name];
				if (name === '|') {
					item = { text: name };
				}
				if (item) {
					item.shortcut = '';
					items.push(item);
				}
			});
			for (var i = 0; i < items.length; i++) {
				if (items[i].text === '|') {
					if (i === 0 || i === items.length - 1) {
						items.splice(i, 1);
					}
				}
			}
			menu = global$2.create('menu', {
				items: items,
				context: 'contextmenu',
				classes: 'contextmenu'
			});
			menu.uiContainer = getUiContainer(editor);
			menu.renderTo(getUiContainer(editor));
			menu.on('hide', function(e) {
				if (e.control === this) {
					visibleState.set(false);
				}
			});
			editor.on('remove', function() {
				menu.remove();
				menu = null;
			});
			return menu;
		};
		var show = function(editor, pos, visibleState, menu) {
			if (menu.get() === null) {
				menu.set(renderMenu(editor, visibleState));
			} else {
				menu.get().show();
			}
			menu.get().moveTo(pos.x, pos.y);
			visibleState.set(true);
		};
		var $_56xhlhayjkmcwodg = { show: show };

		var isNativeOverrideKeyEvent = function(editor, e) {
			return (
				e.ctrlKey && !$_58lvimaujkmcwoda.shouldNeverUseNative(editor)
			);
		};
		var setup = function(editor, visibleState, menu) {
			editor.on('contextmenu', function(e) {
				if (isNativeOverrideKeyEvent(editor, e)) {
					return;
				}
				e.preventDefault();
				$_56xhlhayjkmcwodg.show(
					editor,
					$_alg35gavjkmcwodb.getPos(editor, e),
					visibleState,
					menu
				);
			});
		};
		var $_13glcmatjkmcwod9 = { setup: setup };

		global.add('contextmenu', function(editor) {
			var menu = Cell(null),
				visibleState = Cell(false);
			$_13glcmatjkmcwod9.setup(editor, visibleState, menu);
			return $_78h1xcasjkmcwod8.get(visibleState);
		});

		function Plugin() {}

		return Plugin;
	})();
})();
