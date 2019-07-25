import { FormlyFieldConfig } from '@ngx-formly/core';

export class LayoutConfig {

	public frontendDefaults: FormlyFieldConfig[] = [];

	public backendDefaults: FormlyFieldConfig[] = [
		{
			key: 'aside',
			wrappers: ['panel'],
			templateOptions: { label: 'aside' },
			fieldGroup: [
				{
					key: 'aside.self',
					templateOptions: { label: 'asideSelf' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'aside.self.skin',
							type: 'radio',
							templateOptions: {
								label: 'asideSelfSkin',
								options: [{ value: 'dark', label: 'dark' }, { value: 'light', label: 'light' }]
							},
							defaultValue: 'dark'
						},
						{
							key: 'aside.self.display',
							type: 'checkbox',
							templateOptions: { label: 'asideSelfDisplay' },
							defaultValue: true
						},
						{
							key: 'aside.self.fixed',
							type: 'checkbox',
							templateOptions: { label: 'asideSelfFixed' },
							defaultValue: true
						},
						{
							key: 'aside.self.minimize',
							templateOptions: { label: 'asideSelfMinimize' },
							wrappers: ['panel'],
							fieldGroup: [
								{
									key: 'aside.self.minimize.toggle',
									type: 'checkbox',
									templateOptions: { label: 'asideSelfMinimizeToggle' },
									defaultValue: true
								},
								{
									key: 'aside.self.minimize.default',
									type: 'checkbox',
									templateOptions: { label: 'asideSelfMinimizeDefault' },
									defaultValue: false
								}
							]
						}
					]
				},
				{
					key: 'aside.footer',
					templateOptions: { label: 'asideFooter' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'aside.footer.self',
							templateOptions: { label: 'asideFooterSelf' },
							wrappers: ['panel'],
							fieldGroup: [
								{
									key: 'aside.footer.self.display',
									type: 'checkbox',
									templateOptions: { label: 'asideFooterSelfDisplay' },
									defaultValue: true
								}
							]
						}
					]
				},
				{
					key: 'aside.menu',
					templateOptions: { label: 'asideMenu' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'aside.menu.dropdown',
							type: 'checkbox',
							templateOptions: { label: 'asideMenuDropdown' },
							defaultValue: true
						},
						{
							key: 'aside.menu.scroll',
							type: 'checkbox',
							templateOptions: { label: 'asideMenuScroll' },
							defaultValue: true
						},
						{
							key: 'aside.menu.submenu',
							templateOptions: { label: 'asideMenuSubmenu' },
							wrappers: ['panel'],
							fieldGroup: [
								{
									key: 'aside.menu.submenu.accordion',
									type: 'checkbox',
									templateOptions: { label: 'asideMenuSubmenuAccordion' },
									defaultValue: true
								},
								{
									key: 'aside.menu.submenu.dropdown',
									templateOptions: { label: 'asideMenuSubmenuDropdown' },
									wrappers: ['panel'],
									fieldGroup: [
										{
											key: 'aside.menu.submenu.dropdown.arrow',
											type: 'checkbox',
											templateOptions: { label: 'asideMenuSubmenuDropdownArrow' },
											defaultValue: true
										},
										{
											key: 'aside.menu.submenu.dropdown.hover-timeout',
											type: 'input',
											templateOptions: {
												label: 'asideMenuSubmenuDropdownHover-timeout',
												type: 'number'
											},
											defaultValue: 500
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			key: 'brand',
			wrappers: ['panel'],
			templateOptions: { label: 'brand' },
			fieldGroup: [
				{
					key: 'brand.self',
					templateOptions: { label: 'brandSelf' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'brand.self.skin',
							type: 'radio',
							templateOptions: {
								label: 'brandSelfSkin',
								options: [{ value: 'dark', label: 'dark' }, { value: 'light', label: 'light' }]
							},
							defaultValue: 'dark'
						}
					]
				}
			]
		},
		{
			key: 'colors',
			wrappers: ['panel'],
			templateOptions: { label: 'colors' },
			fieldGroup: [
				{
					key: 'colors.base',
					wrappers: ['panel'],
					templateOptions: { label: 'colorsBase' },
					fieldGroup: [
						{
							key: 'colors.base',
							type: 'select',
							templateOptions: {
								label: 'colorsBase',
								multiple: true,
								options: [
									{ value: '#f0f3ff', label: '#f0f3ff' },
									{ value: '#d9dffa', label: '#d9dffa' },
									{ value: '#c5cbe3', label: '#c5cbe3' },
									{ value: '#a1a8c3', label: '#a1a8c3' },
									{ value: '#3d4465', label: '#3d4465' },
									{ value: '#afb4d4', label: '#afb4d4' },
									{ value: '#646c9a', label: '#646c9a' }
								]
							},
							defaultValue: ['#c5cbe3', '#a1a8c3', '#3d4465', '#3e4466']
						},
						{
							key: 'colors.base.shape',
							type: 'select',
							templateOptions: {
								label: 'colorsBaseShape',
								multiple: true,
								options: [
									{ value: '#f0f3ff', label: '#f0f3ff' },
									{ value: '#d9dffa', label: '#d9dffa' },
									{ value: '#c5cbe3', label: '#c5cbe3' },
									{ value: '#a1a8c3', label: '#a1a8c3' },
									{ value: '#3d4465', label: '#3d4465' },
									{ value: '#afb4d4', label: '#afb4d4' },
									{ value: '#646c9a', label: '#646c9a' }
								]
							},
							defaultValue: ['#f0f3ff', '#d9dffa', '#afb4d4', '#646c9a']
						}
					]
				},
				{
					key: 'colors.state',
					wrappers: ['panel'],
					templateOptions: { label: 'colorsState' },
					fieldGroup: [
						{
							key: 'colors.state.brand',
							type: 'input',
							templateOptions: {
								label: 'colorsStateBrand'
							},
							defaultValue: '#5d78ff'
						},
						{
							key: 'colors.state.dark',
							type: 'input',
							templateOptions: {
								label: 'colorsStateDark'
							},
							defaultValue: '#282a3c'
						},
						{
							key: 'colors.state.light',
							type: 'input',
							templateOptions: {
								label: 'colorsStateLight'
							},
							defaultValue: '#ffffff'
						},
						{
							key: 'colors.state.primary',
							type: 'input',
							templateOptions: {
								label: 'colorsStatePrimary'
							},
							defaultValue: '#5867dd'
						},
						{
							key: 'colors.state.success',
							type: 'input',
							templateOptions: {
								label: 'colorsStateSuccess'
							},
							defaultValue: '#34bfa3'
						},
						{
							key: 'colors.state.warning',
							type: 'input',
							templateOptions: {
								label: 'colorsStateWarning'
							},
							defaultValue: '#ffb822'
						},
						{
							key: 'colors.state.danger',
							type: 'input',
							templateOptions: {
								label: 'colorsStateDanger'
							},
							defaultValue: '#fd3995'
						}
					]
				}
			]
		},
		{
			key: 'content',
			wrappers: ['panel'],
			templateOptions: { label: 'content' },
			fieldGroup: [
				{
					key: 'content.fit-top',
					templateOptions: { label: 'contentFit-top' },
					type: 'checkbox',
					defaultValue: false
				},
				{
					key: 'content.width',
					templateOptions: { label: 'contentWidth' },
					type: 'checkbox',
					defaultValue: true
				}
			]
		},
		{
			key: 'footer',
			wrappers: ['panel'],
			templateOptions: { label: 'footer' },
			fieldGroup: [
				{
					key: 'footer.self',
					templateOptions: { label: 'footerSelf' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'footer.self.fixed',
							templateOptions: { label: 'footerSelfFixed' },
							type: 'checkbox',
							defaultValue: false
						}
					]
				}
			]
		},
		{
			key: 'header',
			wrappers: ['panel'],
			templateOptions: { label: 'header' },
			fieldGroup: [
				{
					key: 'header.self',
					wrappers: ['panel'],
					templateOptions: { label: 'headerSelf' },
					fieldGroup: [
						{
							key: 'header.self.skin',
							templateOptions: {
								label: 'headerSelfSkin',
								options: [{ value: 'dark', label: 'dark' }, { value: 'light', label: 'light' }]
							},
							type: 'select',
							defaultValue: 'light'
						},
						{
							key: 'header.self.fixed',
							wrappers: ['panel'],
							templateOptions: { label: 'headerSelfFixed' },
							fieldGroup: [
								{
									key: 'header.self.fixed.desktop',
									templateOptions: { label: 'headerSelfFixedDesktop' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.self.fixed.mobile',
									templateOptions: { label: 'headerSelfFixedMobile' },
									type: 'checkbox',
									defaultValue: true
								}
							]
						}
					]
				},
				{
					key: 'header.topbar',
					wrappers: ['panel'],
					templateOptions: { label: 'headerTopbar' },
					fieldGroup: [
						{
							key: 'header.topbar.search',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarSearch' },
							fieldGroup: [
								{
									key: 'header.topbar.search.display',
									templateOptions: { label: 'headerTopbarSearchDisplay' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.search.layout',
									type: 'select',
									templateOptions: {
										label: 'headerTopbarSearchLayout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								}
							]
						},
						{
							key: 'header.topbar.notifications',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarNotifications' },
							fieldGroup: [
								{
									key: 'header.topbar.notifications.display',
									templateOptions: { label: 'headerTopbarNotificationsDisplay' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.notifications.layout',
									type: 'select',
									templateOptions: {
										label: 'headerTopbarNotificationsLayout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.notifications.dropdown',
									wrappers: ['panel'],
									templateOptions: { label: 'headerTopbarNotificationsDropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.notifications.dropdown.style',
											type: 'select',
											templateOptions: {
												label: 'headerTopbarNotificationsStyle',
												options: [
													{ value: 'light', label: 'light' },
													{ value: 'dark', label: 'dark' }
												]
											},
											defaultValue: 'dark'
										}
									]
								}
							]
						},
						{
							//  key: 'header.topbar.quick-actions',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarQuick-actions' },
							fieldGroup: [
								{
									key: 'header.topbar.quick-actions.display',
									templateOptions: { label: 'headerTopbarQuick-actionsDisplay' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.quick-actions.layout',
									type: 'select',
									templateOptions: {
										label: 'headerTopbarQuick-actionsLayout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.quick-actions.dropdown',
									wrappers: ['panel'],
									templateOptions: { label: 'headerTopbarQuick-actionsDropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.quick-actions.dropdown.style',
											type: 'select',
											templateOptions: {
												label: 'headerTopbarQuick-actionsStyle',
												options: [
													{ value: 'light', label: 'light' },
													{ value: 'dark', label: 'dark' }
												]
											},
											defaultValue: 'dark'
										}
									]
								}
							]
						},
						{
							//  key: 'header.topbar.user',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarUser' },
							fieldGroup: [
								{
									key: 'header.topbar.user.display',
									templateOptions: { label: 'headerTopbarUserDisplay' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.user.layout',
									type: 'select',
									templateOptions: {
										label: 'headerTopbarUserLayout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.user.dropdown',
									wrappers: ['panel'],
									templateOptions: { label: 'headerTopbarUserDropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.user.dropdown.style',
											type: 'select',
											templateOptions: {
												label: 'headerTopbarUserDropdownStyle',
												options: [
													{ value: 'light', label: 'light' },
													{ value: 'dark', label: 'dark' }
												]
											},
											defaultValue: 'dark'
										}
									]
								}
							]
						},
						{
							key: 'header.topbar.languages',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarLanguages' },
							fieldGroup: [
								{
									key: 'header.topbar.languages.display',
									templateOptions: { label: 'headerTopbarLanguagesDisplay' },
									type: 'checkbox',
									defaultValue: true
								}
							]
						},
						{
							//  key: 'header.topbar.my-cart',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarMy-cart' },
							fieldGroup: [
								{
									key: 'header.topbar.my-cart.display',
									templateOptions: { label: 'headerTopbarMy-cartDisplay' },
									type: 'checkbox',
									defaultValue: false
								},
								{
									key: 'header.topbar.my-cart.layout',
									type: 'select',
									templateOptions: {
										label: 'headerTopbarMy-cartLayout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.notifications.dropdown',
									wrappers: ['panel'],
									templateOptions: { label: 'headerTopbarNotificationsDropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.notifications.dropdown.style',
											type: 'select',
											templateOptions: {
												label: 'headerTopbarNotificationsDropdownStyle',
												options: [
													{ value: 'light', label: 'light' },
													{ value: 'dark', label: 'dark' }
												]
											},
											defaultValue: 'dark'
										}
									]
								}
							]
						},
						{
							//  key: 'header.topbar.quick-panel',
							wrappers: ['panel'],
							templateOptions: { label: 'headerTopbarQuick-panel' },
							fieldGroup: [
								{
									key: 'header.topbar.quick-panel.display',
									templateOptions: { label: 'headerTopbarQuick-panelDisplay' },
									type: 'checkbox',
									defaultValue: true
								}
							]
						}
					]
				},
				{
					key: 'header.menu',
					wrappers: ['panel'],
					templateOptions: { label: 'headerMenu' },
					fieldGroup: [
						{
							key: 'header.menu.self',
							wrappers: ['panel'],
							templateOptions: { label: 'headerMenuSelf' },
							fieldGroup: [
								{
									key: 'header.menu.self.display',
									templateOptions: { label: 'headerMenuSelfDisplay' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.menu.self.layout',
									templateOptions: { label: 'headerMenuSelfLayout' },
									type: 'input',
									defaultValue: 'default'
								},
								{
									key: 'header.menu.self.root-arrow',
									templateOptions: { label: 'headerMenuSelfRoot-arrow' },
									type: 'checkbox',
									defaultValue: false
								}
							]
						},
						{
							key: 'header.menu.desktop',
							wrappers: ['panel'],
							templateOptions: { label: 'headerMenuDesktop' },
							fieldGroup: [
								{
									key: 'header.menu.desktop.toggle',
									templateOptions: { label: 'headerMenuDesktopToggle' },
									type: 'input',
									defaultValue: 'click'
								},
								{
									key: 'header.menu.desktop.arrow',
									templateOptions: { label: 'headerMenuDesktopArrow' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.menu.desktop.submenu',
									wrappers: ['panel'],
									templateOptions: { label: 'headerMenuDesktopSubmenu' },
									fieldGroup: [
										{
											key: 'header.menu.desktop.submenu.skin',
											templateOptions: {
												label: 'headerMenuDesktopSubmenuSkin',
												options: [
													{ value: 'dark', label: 'dark' },
													{ value: 'light', label: 'light' }
												]
											},
											type: 'select',
											defaultValue: 'light'
										},
										{
											key: 'header.menu.desktop.submenu.arrow',
											templateOptions: { label: 'headerMenuDesktopSubmenuArrow' },
											type: 'checkbox',
											defaultValue: true
										}
									]
								}
							]
						},
						{
							key: 'header.menu.mobile',
							wrappers: ['panel'],
							templateOptions: { label: 'headerMenuMobile' },
							fieldGroup: [
								{
									key: 'header.menu.mobile.submenu',
									wrappers: ['panel'],
									templateOptions: { label: 'headerMenuMobileSubmenu' },
									fieldGroup: [
										{
											key: 'header.menu.mobile.submenu.skin',
											templateOptions: {
												label: 'headerMenuMobileSubmenuSkin',
												options: [
													{ value: 'light', label: 'light' },
													{ value: 'dark', label: 'dark' }
												]
											},
											type: 'select',
											defaultValue: 'dark'
										},
										{
											key: 'header.menu.mobile.submenu.accordion',
											templateOptions: { label: 'headerMenuMobileSubmenuAccordion' },
											type: 'checkbox',
											defaultValue: true
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			key: 'loader',
			wrappers: ['panel'],
			templateOptions: { label: 'Loader' },
			fieldGroup: [
				{
					key: 'loader.enabled',
					templateOptions: { label: 'loader.enabled' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'loader.type',
					type: 'select',
					templateOptions: {
						label: 'loader.type',
						options: [
							{value: 'spinner-logo', label: 'spinner-logo'},
							{value: 'spinner-message', label: 'spinner-message'},
							{value: 'spinner-message-logo', label: 'spinner-message-logo'}
						]
					},
					defaultValue: 'spinner-logo'
				},
				{
					key: 'loader.logo',
					type: 'input',
					templateOptions: {
						label: 'loader.logo'
					},
					defaultValue: './assets/media/logos/logo-mini-md.png'
				},
				{
					key: 'loader.message',
					type: 'input',
					templateOptions: {
						label: 'loader.message'
					},
					defaultValue: 'Please wait...'
				}
			]
		},
		{
			key: 'portlet',
			wrappers: ['panel'],
			templateOptions: { label: 'portlet' },
			fieldGroup: [
				{
					key: 'portlet.sticky',
					wrappers: ['panel'],
					templateOptions: { label: 'portlet.sticky' },
					fieldGroup: [
						{
							key: 'portlet.sticky.offset',
							type: 'input',
							templateOptions: {
								type: 'number',
								label: 'portlet.sticky.offset'
							},
							defaultValue: 50
						}
					]
				}
			]
		},
		{
			key: 'self',
			wrappers: ['panel'],
			templateOptions: { label: 'self' },
			fieldGroup: [
				{
					key: 'self.body',
					wrappers: ['panel'],
					templateOptions: { label: 'self.body' },
					fieldGroup: [
						{
							key: 'self.body.background-image',
							wrappers: ['panel'],
							type: 'select',
							templateOptions: {
								label: 'self.body.background-image',
								options: [
									{ value: './assets/media/misc/bg-1.jpg', label: './assets/media/misc/bg-1.jpg' },
									{ value: './assets/media/misc/bg-2.jpg', label: './assets/media/misc/bg-2.jpg' }
								]
							},
							defaultValue: './assets/media/misc/bg-2.jpg'
						},
						{
							key: 'self.body.class',
							type: 'input',
							templateOptions: {
								label: 'self.body.class'
							},
							defaultValue: 'fixed'
						}
					]
				},
				{
					key: 'self.layout',
					type: 'select',
					templateOptions: {
						label: 'self.layout',
						options: [
							{ value: 'boxed', label: 'boxed' },
							{ value: 'fluid', label: 'fluid' },
							{ value: 'fixed', label: 'fixed' }
						]
					},
					defaultValue: 'fixed'
				},
				{
					key: 'self.logo',
					wrappers: ['panel'],
					templateOptions: { label: 'self.logo' },
					fieldGroup: [
						{
							key: 'self.logo.dark',
							type: 'input',
							templateOptions: { label: 'self.logo.dark' },
							defaultValue: './assets/media/logos/logo-light.png'
						},
						{
							key: 'self.logo.brand',
							type: 'input',
							templateOptions: { label: 'self.logo.brand' },
							defaultValue: './assets/media/logos/logo-light.png'
						},
						{
							key: 'self.logo.green',
							type: 'input',
							templateOptions: { label: 'self.logo.green' },
							defaultValue: './assets/media/logos/logo-light.png'
						},
						{
							key: 'self.logo.light',
							type: 'input',
							templateOptions: { label: 'self.logo.light' },
							defaultValue: './assets/media/logos/logo-dark.png'
						}
					]
				},
				{
					key: 'self.mainLogo',
					wrappers: ['panel'],
					type: 'select',
					templateOptions: {
						label: 'self.mainLogo.label',
						options: [
							{
								value: './assets/media/logos/logo-dark.png', label: './assets/media/logos/logo-dark.png'
							},
							{
								value: './assets/media/logos/logo-light.png',
								label: './assets/media/logos/logo-light.png'
							},
							{ value: './assets/media/logos/logo-2.png', label: './assets/media/logos/logo-2.png' },
							{ value: './assets/media/logos/logo-3.png', label: './assets/media/logos/logo-3.png' },
							{ value: './assets/media/logos/logo-4.png', label: './assets/media/logos/logo-4.png' },
							{ value: './assets/media/logos/logo-5.png', label: './assets/media/logos/logo-5.png' },
							{ value: './assets/media/logos/logo-6.png', label: './assets/media/logos/logo-6.png' },
							{ value: './assets/media/logos/logo-7.png', label: './assets/media/logos/logo-7.png' },
							{ value: './assets/media/logos/logo-8.png', label: './assets/media/logos/logo-8.png' },
							{ value: './assets/media/logos/logo-9.png', label: './assets/media/logos/logo-9.png' },
							{ value: './assets/media/logos/logo-10.png', label: './assets/media/logos/logo-10.png' },
							{ value: './assets/media/logos/logo-11.png', label: './assets/media/logos/logo-11.png' },
							{ value: './assets/media/logos/logo-12.png', label: './assets/media/logos/logo-12.png' }
						]
					},
					defaultValue: './assets/media/logos/logo-light.png'
				},
				{
					key: 'self.stickyLogo',
					wrappers: ['panel'],
					type: 'select',
					templateOptions: {
						label: 'self.stickyLogo',
						options: [
							{
								value: './assets/media/logos/logo-dark.png', label: './assets/media/logos/logo-dark.png'
							},
							{
								value: './assets/media/logos/logo-light.png',
								label: './assets/media/logos/logo-light.png'
							},
							{ value: './assets/media/logos/logo-2.png', label: './assets/media/logos/logo-2.png' },
							{ value: './assets/media/logos/logo-3.png', label: './assets/media/logos/logo-3.png' },
							{ value: './assets/media/logos/logo-4.png', label: './assets/media/logos/logo-4.png' },
							{ value: './assets/media/logos/logo-5.png', label: './assets/media/logos/logo-5.png' },
							{ value: './assets/media/logos/logo-6.png', label: './assets/media/logos/logo-6.png' },
							{ value: './assets/media/logos/logo-7.png', label: './assets/media/logos/logo-7.png' },
							{ value: './assets/media/logos/logo-8.png', label: './assets/media/logos/logo-8.png' },
							{ value: './assets/media/logos/logo-9.png', label: './assets/media/logos/logo-9.png' },
							{ value: './assets/media/logos/logo-10.png', label: './assets/media/logos/logo-10.png' },
							{ value: './assets/media/logos/logo-11.png', label: './assets/media/logos/logo-11.png' },
							{ value: './assets/media/logos/logo-12.png', label: './assets/media/logos/logo-12.png' }
						]
					},
					defaultValue: './assets/media/logos/logo-dark.png'
				}
			]
		},
		{
			key: 'subheader',
			wrappers: ['panel'],
			templateOptions: { label: 'Subheader' },
			fieldGroup: [
				{
					key: 'subheader.display',
					templateOptions: { label: 'subheader.display' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'subheader.fixed',
					templateOptions: { label: 'subheader.fixed' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'subheader.layout',
					type: 'select',
					templateOptions: {
						label: 'subheader.layout.title',
						options: [
							{ value: 'subheader-v1', label: 'subheader-v1' },
							{ value: 'subheader-v2', label: 'subheader-v2' },
							{ value: 'subheader-v3', label: 'subheader-v3' },
							{ value: 'subheader-v4', label: 'subheader-v4' },
							{ value: 'subheader-v5', label: 'subheader-v5' }
						]
					},
					defaultValue: 'subheader-v1'
				},
				{
					key: 'subheader.style',
					type: 'select',
					templateOptions: {
						label: 'subheader.layout.title',
						options: [
							{ value: 'light', label: 'light' },
							{ value: 'dark', label: 'dark' },
							{ value: 'transparent', label: 'transparent' }
						]
					},
					defaultValue: 'light'
				}
			]
		}
	];

	public get frontendConfig() {
		return this.frontendDefaults;
	}

	public get backendConfig() {
		return this.backendDefaults;
	}
}
