import { BackendLayoutConfigModel } from '../../_base/layout';

export class LayoutConfig {

	public defaults: {
		backend: BackendLayoutConfigModel,
		frontend: any
	} = {
		backend: {
			self: {
				body: {
					'background-image': {
						type: 'checkbox-list',
						options: ['./assets/media/misc/bg-1.jpg', './assets/media/misc/bg-2.jpg', './assets/media/misc/bg-3.jpg', './assets/media/misc/bg-4.jpg', './assets/media/misc/bg-5.jpg'],
						selected: './assets/media/misc/bg-3.jpg'
					}
				},
				layout: {
					type: 'select',
					options: ['fluid', 'fixed'],
					selected: 'fixed'
				},
				logo: {
					type: 'list',
					selected: [
						{
							title: 'dark',
							value: './assets/media/logos/logo-light.png'
						},
						{
							title: 'light',
							value: './assets/media/logos/logo-dark.png'
						},
						{
							title: 'brand',
							value: './assets/media/logos/logo-light.png'
						},
						{
							title: 'green',
							value: './assets/media/logos/logo-light.png'
						}
					]
				}
			}/*,
			 portlet: {
			 sticky: {
			 offset: {
			 type: 'number',
			 options: 50,
			 selected: 50
			 }
			 }
			 },
			 loader: {
			 enabled: {
			 type: 'checkbox',
			 selected: true
			 },
			 type: {
			 type: 'select',
			 options: ['default', 'spinner-message', 'spinner-logo'],
			 selected: 'spinner-logo'
			 },
			 logo: './assets/media/logos/logo-mini-md.png',
			 message: 'Please wait...'
			 },
			 colors: {
			 state: {
			 'brand': '#5d78ff',
			 'dark': '#282a3c',
			 'light': '#ffffff',
			 'primary': '#5867dd',
			 'success': '#34bfa3',
			 'info': '#36a3f7',
			 'warning': '#ffb822',
			 'danger': '#fd3995'
			 },
			 base: {
			 'label': {
			 type: 'multi-select',
			 options: ['#f0f3ff', '#d9dffa', '#c5cbe3', '#a1a8c3', '#3d4465', '#3e4466', '#afb4d4', '#646c9a'],
			 selected: ['#c5cbe3', '#a1a8c3', '#3d4465', '#3e4466']
			 },
			 'shape': {
			 type: 'multi-select',
			 options: ['#f0f3ff', '#d9dffa', '#c5cbe3', '#a1a8c3', '#3d4465', '#3e4466', '#afb4d4', '#646c9a'],
			 selected: ['#f0f3ff', '#d9dffa', '#afb4d4', '#646c9a']
			 }
			 }
			 },
			 header: {
			 self: {
			 'skin': 'light',
			 'fixed': {
			 'desktop': {
			 type: 'checkbox',
			 selected: true
			 },
			 'mobile': {
			 type: 'checkbox',
			 selected: true
			 }
			 }
			 },
			 'topbar': {
			 'search': {
			 'display': {
			 type: 'checkbox',
			 selected: false
			 },
			 layout: {
			 type: 'select',
			 options: ['offcanvas', 'dropdown'],
			 selected: 'dropdown'
			 }
			 },
			 'notifications': {
			 display: {
			 type: 'checkbox',
			 selected: true
			 },
			 'layout': {
			 type: 'select',
			 options: ['offcanvas', 'dropdown'],
			 selected: 'dropdown'
			 },
			 'dropdown': {
			 'style': {
			 type: 'select',
			 options: ['light', 'dark'],
			 selected: 'dark'
			 }
			 }
			 },
			 'quick-actions': {
			 display: {
			 type: 'checkbox',
			 selected: true
			 },
			 'layout': {
			 type: 'select',
			 options: ['offcanvas', 'dropdown'],
			 selected: 'dropdown'
			 },
			 'dropdown': {
			 'style': {
			 type: 'select',
			 options: ['light', 'dark'],
			 selected: 'dark'
			 }
			 }
			 },
			 'user': {
			 'display': {
			 type: 'checkbox',
			 selected: true
			 },
			 'layout': {
			 type: 'select',
			 options: ['offcanvas', 'dropdown'],
			 selected: 'dropdown'
			 },
			 'dropdown': {
			 'style': {
			 type: 'select',
			 options: ['light', 'dark'],
			 selected: 'dark'
			 }
			 }
			 },
			 'languages': {
			 'display': {
			 type: 'checkbox',
			 selected: true
			 }
			 },
			 'my-cart': {
			 'display': {
			 type: 'checkbox',
			 selected: false
			 },
			 'layout': 'dropdown',
			 'dropdown': {
			 'style': 'light'
			 }
			 },
			 'quick-panel': {
			 'display': {
			 type: 'checkbox',
			 selected: true
			 }
			 }
			 },
			 'menu': {
			 'self': {
			 'display': {
			 type: 'checkbox',
			 selected: true
			 },
			 'layout': 'default',
			 'root-arrow': {
			 type: 'checkbox',
			 selected: false
			 }
			 },
			 'desktop': {
			 'arrow': {
			 type: 'checkbox',
			 selected: true
			 },
			 'toggle': 'click',
			 'submenu': {
			 'skin': 'light',
			 'arrow': {
			 type: 'checkbox',
			 selected: true
			 }
			 }
			 },
			 'mobile': {
			 'submenu': {
			 'skin': 'dark',
			 'accordion': {
			 type: 'checkbox',
			 selected: true
			 }
			 }
			 }
			 }
			 },
			 subheader: {
			 display: {
			 type: 'checkbox',
			 selected: true
			 },
			 layout: {
			 type: 'select',
			 options: ['subheader-v1', 'subheader-v2', 'subheader-v3', 'subheader-v4', 'subheader-v5', 'subheader-v6'],
			 selected: 'subheader-v2'
			 },
			 fixed: {
			 type: 'checkbox',
			 selected: true
			 },
			 style: {
			 type: 'select',
			 options: ['light', 'solid', 'transparent'],
			 selected: 'light'
			 }
			 },
			 brand: {
			 self: {
			 skin: 'dark'
			 }
			 },
			 aside: {
			 self: {
			 skin: 'dark',
			 display: {
			 type: 'checkbox',
			 selected: true
			 },
			 fixed: {
			 type: 'checkbox',
			 selected: true
			 },
			 minimize: {
			 toggle: {
			 type: 'checkbox',
			 selected: true
			 },
			 default: {
			 type: 'checkbox',
			 selected: false
			 }
			 }
			 },
			 footer: {
			 self: {
			 display: {
			 type: 'checkbox',
			 selected: true
			 }
			 }
			 },
			 menu: {
			 dropdown: {
			 type: 'checkbox',
			 selected: true
			 },
			 scroll: {
			 type: 'checkbox',
			 selected: true
			 },
			 submenu: {
			 accordion: {
			 type: 'checkbox',
			 selected: true
			 },
			 dropdown: {
			 arrow: {
			 type: 'checkbox',
			 selected: true
			 },
			 'hover-timeout': 500
			 }
			 }
			 }
			 },
			 footer: {
			 self: {
			 fixed: {
			 type: 'checkbox',
			 selected: true
			 }
			 }
			 } */
		},
		frontend: {}
	};

	/**
	 * ToDo: Frontend load Config
	 */
	public get configs(): {
		backend: BackendLayoutConfigModel,
		frontend: any;
	} {
		return this.defaults;
	}
}
