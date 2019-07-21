import { FormlyFieldConfig } from '@ngx-formly/core';

export class LayoutConfig {

	public frontendDefaults: FormlyFieldConfig[] = [];

	public backendDefaults: FormlyFieldConfig[] = [
		{
			key: 'aside.key',
			wrappers: ['panel'],
			templateOptions: { label: 'aside' },
			fieldGroup: [
				{
					key: 'aside.self.key',
					templateOptions: { label: 'aside.self' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'aside.self.skin.key',
							type: 'radio',
							templateOptions: {
								label: 'aside.self.skin',
								options: [{ value: 'dark', label: 'dark' }, { value: 'light', label: 'light' }]
							},
							defaultValue: 'dark'
						},
						{
							key: 'aside.self.display.key',
							type: 'checkbox',
							templateOptions: { label: 'aside.self.display' },
							defaultValue: true
						},
						{
							key: 'aside.self.fixed.key',
							type: 'checkbox',
							templateOptions: { label: 'aside.self.fixed' },
							defaultValue: true
						},
						{
							key: 'aside.self.minimize.key',
							templateOptions: { label: 'aside.self.minimize' },
							wrappers: ['panel'],
							fieldGroup: [
								{
									key: 'aside.self.minimize.toggle.key',
									type: 'checkbox',
									templateOptions: { label: 'aside.self.minimize.toggle' },
									defaultValue: true
								},
								{
									key: 'aside.self.minimize.default.key',
									type: 'checkbox',
									templateOptions: { label: 'aside.self.minimize.default' },
									defaultValue: false
								}
							]
						}
					]
				},
				{
					key: 'aside.footer.key',
					templateOptions: { label: 'aside.footer' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'aside.footer.self.key',
							templateOptions: { label: 'aside.footer.self' },
							wrappers: ['panel'],
							fieldGroup: [
								{
									key: 'aside.footer.self.display.key',
									type: 'checkbox',
									templateOptions: { label: 'aside.footer.self.display' },
									defaultValue: true
								}
							]
						}
					]
				},
				{
					key: 'aside.menu.key',
					templateOptions: { label: 'aside.menu' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'aside.menu.dropdown.key',
							type: 'checkbox',
							templateOptions: { label: 'aside.menu.dropdown' },
							defaultValue: true
						},
						{
							key: 'aside.menu.scroll.key',
							type: 'checkbox',
							templateOptions: { label: 'aside.menu.scroll' },
							defaultValue: true
						},
						{
							key: 'aside.menu.submenu.key',
							templateOptions: { label: 'aside.menu.submenu' },
							wrappers: ['panel'],
							fieldGroup: [
								{
									key: 'aside.menu.submenu.accordion.key',
									type: 'checkbox',
									templateOptions: { label: 'aside.menu.submenu.accordion' },
									defaultValue: true
								},
								{
									key: 'aside.menu.submenu.dropdown.key',
									templateOptions: { label: 'aside.menu.submenu.dropdown' },
									wrappers: ['panel'],
									fieldGroup: [
										{
											key: 'aside.menu.submenu.dropdown.arrow.key',
											type: 'checkbox',
											templateOptions: { label: 'aside.menu.submenu.dropdown.arrow' },
											defaultValue: true
										},
										{
											key: 'aside.menu.submenu.dropdown.hover-timeout.key',
											type: 'input',
											templateOptions: {
												label: 'aside.menu.submenu.dropdown.arrow',
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
			key: 'brand.key',
			wrappers: ['panel'],
			templateOptions: { label: 'brand' },
			fieldGroup: [
				{
					key: 'brand.self.key',
					templateOptions: { label: 'brand.self' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'brand.self.skin.key',
							type: 'radio',
							templateOptions: {
								label: 'brand.self.skin',
								options: [{ value: 'dark', label: 'dark' }, { value: 'light', label: 'light' }]
							},
							defaultValue: 'dark'
						}
					]
				}
			]
		},
		{
			key: 'colors.key',
			wrappers: ['panel'],
			templateOptions: { label: 'Colours' },
			fieldGroup: [
				{
					key: 'colors.base.key',
					wrappers: ['panel'],
					templateOptions: { label: 'Colours.base' },
					fieldGroup: [
						{
							key: 'colors.base.key',
							type: 'select',
							templateOptions: {
								label: 'colors.base',
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
							key: 'colors.base.shape.key',
							type: 'select',
							templateOptions: {
								label: 'colors.base.shape',
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
					key: 'colors.state.key',
					wrappers: ['panel'],
					templateOptions: { label: 'Colours.state' },
					fieldGroup: [
						{
							key: 'colors.state.brand.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.brand'
							},
							defaultValue: '#5d78ff'
						},
						{
							key: 'colors.state.dark.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.dark'
							},
							defaultValue: '#282a3c'
						},
						{
							key: 'colors.state.light.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.light'
							},
							defaultValue: '#ffffff'
						},
						{
							key: 'colors.state.primary.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.primary'
							},
							defaultValue: '#5867dd'
						},
						{
							key: 'colors.state.success.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.success'
							},
							defaultValue: '#34bfa3'
						},
						{
							key: 'colors.state.warning.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.warning'
							},
							defaultValue: '#ffb822'
						},
						{
							key: 'colors.state.danger.key',
							type: 'input',
							templateOptions: {
								label: 'colors.state.danger'
							},
							defaultValue: '#fd3995'
						}
					]
				}
			]
		},
		{
			key: 'content.key',
			wrappers: ['panel'],
			templateOptions: { label: 'content' },
			fieldGroup: [
				{
					key: 'content.fit-top.key',
					templateOptions: { label: 'content.fit-top' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'content.width.key',
					templateOptions: { label: 'content.width' },
					type: 'checkbox',
					defaultValue: true
				}
			]
		},
		{
			key: 'footer.key',
			wrappers: ['panel'],
			templateOptions: { label: 'footer' },
			fieldGroup: [
				{
					key: 'footer.self.key',
					templateOptions: { label: 'footer.self' },
					wrappers: ['panel'],
					fieldGroup: [
						{
							key: 'footer.self.fixed.key',
							templateOptions: { label: 'footer.self.fixed' },
							type: 'checkbox',
							defaultValue: true
						}
					]
				}
			]
		},
		{
			key: 'header.key',
			wrappers: ['panel'],
			templateOptions: { label: 'header' },
			fieldGroup: [
				{
					key: 'header.self.key',
					wrappers: ['panel'],
					templateOptions: { label: 'header.self' },
					fieldGroup: [
						{
							key: 'header.self.skin.key',
							templateOptions: {
								label: 'header.self.skin',
								options: [{ value: 'dark', label: 'dark' }, { value: 'light', label: 'light' }]
							},
							type: 'select',
							defaultValue: 'light'
						},
						{
							key: 'header.self.fixed.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.self.fixed' },
							fieldGroup: [
								{
									key: 'header.self.fixed.desktop.key',
									templateOptions: { label: 'header.self.fixed.desktop' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.self.fixed.mobile.key',
									templateOptions: { label: 'header.self.fixed.mobile' },
									type: 'checkbox',
									defaultValue: true
								}
							]
						}
					]
				},
				{
					key: 'header.topbar.key',
					wrappers: ['panel'],
					templateOptions: { label: 'header.topbar' },
					fieldGroup: [
						{
							key: 'header.topbar.search.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.search' },
							fieldGroup: [
								{
									key: 'header.topbar.search.display.key',
									templateOptions: { label: 'header.topbar.search.display' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.search.layout.key',
									type: 'select',
									templateOptions: {
										label: 'header.topbar.search.layout',
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
							key: 'header.topbar.notifications.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.notifications' },
							fieldGroup: [
								{
									key: 'header.topbar.notifications.display.key',
									templateOptions: { label: 'header.topbar.notifications.display' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.notifications.layout.key',
									type: 'select',
									templateOptions: {
										label: 'header.topbar.notifications.layout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.notifications.dropdown.key',
									wrappers: ['panel'],
									templateOptions: { label: 'header.topbar.notifications.dropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.notifications.dropdown.style.key',
											type: 'select',
											templateOptions: {
												label: 'header.topbar.notifications.dropdown.style',
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
							key: 'header.topbar.quick-actions.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.quick-actions' },
							fieldGroup: [
								{
									key: 'header.topbar.quick-actions.display.key',
									templateOptions: { label: 'header.topbar.quick-actions.display' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.quick-actions.layout.key',
									type: 'select',
									templateOptions: {
										label: 'header.topbar.quick-actions.layout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.quick-actions.dropdown.key',
									wrappers: ['panel'],
									templateOptions: { label: 'header.topbar.quick-actions.dropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.quick-actions.dropdown.style.key',
											type: 'select',
											templateOptions: {
												label: 'header.topbar.quick-actions.dropdown.style',
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
							key: 'header.topbar.user.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.user' },
							fieldGroup: [
								{
									key: 'header.topbar.user.display.key',
									templateOptions: { label: 'header.topbar.user.display' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.topbar.user.layout.key',
									type: 'select',
									templateOptions: {
										label: 'header.topbar.user.layout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.user.dropdown.key',
									wrappers: ['panel'],
									templateOptions: { label: 'header.topbar.user.dropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.user.dropdown.style.key',
											type: 'select',
											templateOptions: {
												label: 'header.topbar.user.dropdown.style',
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
							key: 'header.topbar.languages.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.user' },
							fieldGroup: [
								{
									key: 'header.topbar.languages.display.key',
									templateOptions: { label: 'header.topbar.languages.display' },
									type: 'checkbox',
									defaultValue: true
								}
							]
						},
						{
							key: 'header.topbar.my-cart.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.my-cart' },
							fieldGroup: [
								{
									key: 'header.topbar.my-cart.display.key',
									templateOptions: { label: 'header.topbar.my-cart.display' },
									type: 'checkbox',
									defaultValue: false
								},
								{
									key: 'header.topbar.my-cart.layout.key',
									type: 'select',
									templateOptions: {
										label: 'header.topbar.my-cart.layout',
										options: [
											{ value: 'offcanvas', label: 'offcanvas' },
											{ value: 'dropdown', label: 'dropdown' }
										]
									},
									defaultValue: 'dropdown'
								},
								{
									key: 'header.topbar.notifications.dropdown.key',
									wrappers: ['panel'],
									templateOptions: { label: 'header.topbar.notifications.dropdown' },
									fieldGroup: [
										{
											key: 'header.topbar.notifications.dropdown.style.key',
											type: 'select',
											templateOptions: {
												label: 'header.topbar.notifications.dropdown.style',
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
							key: 'header.topbar.quick-panel.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.topbar.quick-panel' },
							fieldGroup: [
								{
									key: 'header.topbar.quick-panel.display.key',
									templateOptions: { label: 'header.topbar.quick-panel.display' },
									type: 'checkbox',
									defaultValue: true
								}
							]
						}
					]
				},
				{
					key: 'header.menu.key',
					wrappers: ['panel'],
					templateOptions: { label: 'header.menu' },
					fieldGroup: [
						{
							key: 'header.menu.self.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.menu.self' },
							fieldGroup: [
								{
									key: 'header.menu.self.display.key',
									templateOptions: { label: 'header.menu.self.display' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.menu.self.layout.key',
									templateOptions: { label: 'header.menu.self.layout' },
									type: 'input',
									defaultValue: 'default'
								},
								{
									key: 'header.menu.self.root-arrow.key',
									templateOptions: { label: 'header.menu.self.root-arrow' },
									type: 'checkbox',
									defaultValue: false
								}
							]
						},
						{
							key: 'header.menu.desktop.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.menu.desktop' },
							fieldGroup: [
								{
									key: 'header.menu.desktop.toggle.key',
									templateOptions: { label: 'header.menu.desktop.toggle' },
									type: 'input',
									defaultValue: 'click'
								},
								{
									key: 'header.menu.desktop.arrow.key',
									templateOptions: { label: 'header.menu.desktop.arrow' },
									type: 'checkbox',
									defaultValue: true
								},
								{
									key: 'header.menu.desktop.submenu.key',
									wrappers: ['panel'],
									templateOptions: { label: 'header.menu.desktop.submenu' },
									fieldGroup: [
										{
											key: 'header.menu.desktop.submenu.skin.key',
											templateOptions: {
												label: 'header.menu.desktop.submenu.skin',
												options: [
													{ value: 'dark', label: 'dark' },
													{ value: 'light', label: 'light' }
												]
											},
											type: 'select',
											defaultValue: 'light'
										},
										{
											key: 'header.menu.desktop.submenu.arrow.key',
											templateOptions: { label: 'header.menu.desktop.submenu.arrow' },
											type: 'checkbox',
											defaultValue: true
										}
									]
								}
							]
						},
						{
							key: 'header.menu.mobile.key',
							wrappers: ['panel'],
							templateOptions: { label: 'header.menu.mobile' },
							fieldGroup: [
								{
									key: 'header.menu.mobile.submenu.key',
									wrappers: ['panel'],
									templateOptions: { label: 'header.menu.mobile.submenu' },
									fieldGroup: [
										{
											key: 'header.menu.mobile.submenu.skin.key',
											templateOptions: {
												label: 'header.menu.mobile.submenu',
												options: [
													{ value: 'light', label: 'light' },
													{ value: 'dark', label: 'dark' }
												]
											},
											type: 'select',
											defaultValue: 'dark'
										},
										{
											key: 'header.menu.mobile.submenu.accordion.key',
											templateOptions: { label: 'header.menu.mobile.submenu.accordion' },
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
			key: 'loader.key',
			wrappers: ['panel'],
			templateOptions: { label: 'Loader' },
			fieldGroup: [
				{
					key: 'loader.enabled.key',
					templateOptions: { label: 'loader.enabled' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'loader.type.key',
					type: 'select',
					templateOptions: {
						label: 'loader.type',
						options: [
							{value: 'spinner-logo', label: 'spinner-logo'},
							{value: 'spinner-message', label: 'spinner-message'},
							{value: 'spinner-message-logo', label: 'spinner-message-logo'}
						]
					},
					defaultValue: 'spinner-message-logo'
				},
				{
					key: 'loader.logo.key',
					type: 'input',
					templateOptions: {
						label: 'loader.logo'
					},
					defaultValue: './assets/media/logos/logo-mini-md.png'
				},
				{
					key: 'loader.message.key',
					type: 'input',
					templateOptions: {
						label: 'loader.message'
					},
					defaultValue: 'Please wait...'
				}
			]
		},
		{
			key: 'portlet.key',
			wrappers: ['panel'],
			templateOptions: { label: 'portlet' },
			fieldGroup: [
				{
					key: 'portlet.sticky.key',
					wrappers: ['panel'],
					templateOptions: { label: 'portlet.sticky' },
					fieldGroup: [
						{
							key: 'portlet.sticky.offset.key',
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
			key: 'self.key',
			wrappers: ['panel'],
			templateOptions: { label: 'self' },
			fieldGroup: [
				{
					key: 'self.body.key',
					wrappers: ['panel'],
					templateOptions: { label: 'self.body' },
					fieldGroup: [
						{
							key: 'self.body.background-image.key',
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
							key: 'self.body.class.key',
							type: 'input',
							templateOptions: {
								label: 'self.body.class'
							},
							defaultValue: 'fixed'
						}
					]
				},
				{
					key: 'self.layout.key',
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
					key: 'self.logo.key',
					wrappers: ['panel'],
					templateOptions: { label: 'self.logo' },
					fieldGroup: [
						{
							key: 'self.logo.dark.key',
							type: 'input',
							templateOptions: { label: 'self.logo.dark' },
							defaultValue: './assets/media/logos/logo-light.png'
						},
						{
							key: 'self.logo.brand.key',
							type: 'input',
							templateOptions: { label: 'self.logo.brand' },
							defaultValue: './assets/media/logos/logo-light.png'
						},
						{
							key: 'self.logo.green.key',
							type: 'input',
							templateOptions: { label: 'self.logo.green' },
							defaultValue: './assets/media/logos/logo-light.png'
						},
						{
							key: 'self.logo.light.key',
							type: 'input',
							templateOptions: { label: 'self.logo.light' },
							defaultValue: './assets/media/logos/logo-dark.png'
						}
					]
				},
				{
					key: 'self.mainLogo.key',
					wrappers: ['panel'],
					type: 'select',
					templateOptions: {
						label: 'self.mainLogo',
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
					key: 'self.stickyLogo.key',
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
			key: 'subheader.key',
			wrappers: ['panel'],
			templateOptions: { label: 'Subheader' },
			fieldGroup: [
				{
					key: 'subheader.display.key',
					templateOptions: { label: 'subheader.display' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'subheader.fixed.key',
					templateOptions: { label: 'subheader.fixed' },
					type: 'checkbox',
					defaultValue: true
				},
				{
					key: 'subheader.layout.key',
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
					key: 'subheader.style.key',
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
