export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pages',
					'root': true,
					'icon-': 'flaticon-add',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'alignment': 'left',
					'translate': 'MENU.PAGES',
					'submenu': {
						'type': 'classic',
						'alignment': 'left',
						'items': [
							{
								'title': 'My Account',
								'icon': 'flaticon-file',
								'page': 'index'
							},
							{
								'title': 'Task Manager',
								'icon': 'flaticon-diagram',
								'badge': {
									'type': 'kt-badge--success',
									'value': '2'
								}
							},
							{
								'title': 'Team Manager',
								'icon': 'flaticon-business',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'bullet': 'line',
									'items': [
										{
											'title': 'Add Team Member',
											'icon': ''
										},
										{
											'title': 'Edit Team Member',
											'icon': ''
										},
										{
											'title': 'Delete Team Member',
											'icon': ''
										},
										{
											'title': 'Team Member Reports',
											'icon': ''
										},
										{
											'title': 'Assign Tasks',
											'icon': ''
										},
										{
											'title': 'Promote Team Member',
											'icon': ''
										}
									]
								}
							},
							{
								'title': 'Projects Manager',
								'page': '#',
								'icon': 'flaticon-chat-1',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'bullet': 'dot',
									'items': [
										{
											'title': 'Latest Projects',
											'icon': ''
										},
										{
											'title': 'Ongoing Projects',
											'icon': ''
										},
										{
											'title': 'Urgent Projects',
											'icon': ''
										},
										{
											'title': 'Completed Projects',
											'icon': ''
										},
										{
											'title': 'Dropped Projects',
											'icon': ''
										}
									]
								}
							},
							{
								'title': 'Create New Project',
								'icon': 'flaticon-users'
							}
						]
					}
				},
				{
					'title': 'Features',
					'root': true,
					'icon-': 'flaticon-line-graph',
					'toggle': 'click',
					'alignment': 'left',
					'translate': 'MENU.FEATURES',
					'submenu': {
						'type': 'mega',
						'width': '1000px',
						'alignment': 'left',
						'columns': [
							{
								'heading': {
									'heading': true,
									'title': 'Task Reports',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Latest Tasks',
										'icon': 'flaticon-map'
									},
									{
										'title': 'Pending Tasks',
										'icon': 'flaticon-user'
									},
									{
										'title': 'Urgent Tasks',
										'icon': 'flaticon-clipboard'
									},
									{
										'title': 'Completed Tasks',
										'icon': 'flaticon-graphic-1'
									},
									{
										'title': 'Failed Tasks',
										'icon': 'flaticon-graphic-2'
									}
								]
							},
							{
								'bullet': 'line',
								'heading': {
									'heading': true,
									'title': 'Profit Margins',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Overall Profits',
										'icon': ''
									},
									{
										'title': 'Gross Profits',
										'icon': ''
									},
									{
										'title': 'Nett Profits',
										'icon': ''
									},
									{
										'title': 'Year to Date Reports',
										'icon': ''
									},
									{
										'title': 'Quarterly Profits',
										'icon': ''
									},
									{
										'title': 'Monthly Profits',
										'icon': ''
									}
								]
							},
							{
								'bullet': 'dot',
								'heading': {
									'heading': true,
									'title': 'Staff Management',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Top Management',
										'icon': ''
									},
									{
										'title': 'Project Managers',
										'icon': ''
									},
									{
										'title': 'Development Staff',
										'icon': ''
									},
									{
										'title': 'Customer Service',
										'icon': ''
									},
									{
										'title': 'Sales and Marketing',
										'icon': ''
									},
									{
										'title': 'Executives',
										'icon': ''
									}
								]
							},
							{
								'heading': {
									'heading': true,
									'title': 'Tools',
									'icon': '',
									'bullet': 'dot'
								},
								'items': [
									{
										'title': 'Analytical Reports',
										'icon': ''
									},
									{
										'title': 'Customer CRM',
										'icon': ''
									},
									{
										'title': 'Operational Growth',
										'icon': ''
									},
									{
										'title': 'Social Media Presence',
										'icon': ''
									},
									{
										'title': 'Files and Directories',
										'icon': ''
									},
									{
										'title': 'Audit & Logs',
										'icon': ''
									}
								]
							}
						]
					}
				},
				{
					'title': 'Apps',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'alignment': 'left',
					'translate': 'MENU.APPS',
					'submenu': {
						'type': 'classic',
						'alignment': 'left',
						'items': [
							{
								'title': 'Reporting',
								'icon': 'flaticon-business'
							},
							{
								'title': 'Social Presence',
								'page': 'components/datatable_v1',
								'icon': 'flaticon-computer',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'items': [
										{
											'title': 'Reached Users',
											'icon': 'flaticon-users'
										},
										{
											'title': 'SEO Ranking',
											'icon': 'flaticon-interface-1'
										},
										{
											'title': 'User Dropout Points',
											'icon': 'flaticon-lifebuoy'
										},
										{
											'title': 'Market Segments',
											'icon': 'flaticon-graphic-1'
										},
										{
											'title': 'Opportunity Growth',
											'icon': 'flaticon-graphic'
										}
									]
								}
							},
							{
								'title': 'Sales & Marketing',
								'icon': 'flaticon-map'
							},
							{
								'title': 'Campaigns',
								'icon': 'flaticon-graphic-2',
								'badge': {
									'type': 'kt-badge--success',
									'value': '3'
								}
							},
							{
								'title': 'Deployment Center',
								'page': '',
								'icon': 'flaticon-infinity',
								'submenu': {
									'type': 'classic',
									'alignment': 'right',
									'items': [
										{
											'title': 'Merge Branch',
											'icon': 'flaticon-add',
											'badge': {
												'type': 'kt-badge--danger',
												'value': '3'
											}
										},
										{
											'title': 'Version Controls',
											'icon': 'flaticon-signs-1'
										},
										{
											'title': 'Database Manager',
											'icon': 'flaticon-folder'
										},
										{
											'title': 'System Settings',
											'icon': 'flaticon-cogwheel-2'
										}
									]
								}
							}
						]
					}
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot'
				},
				{
					title: 'Calendar',
					root: true,
					page: '/calendar',
					translate: 'MENU.CALENDAR',
					icon: 'flaticon-event-calendar-symbol'
				},
				{ section: 'Content', translate: 'MENU.CONTENT' },
				{
					title: 'Media-Upload',
					root: true,
					icon: 'flaticon-multimedia-3',
					translate: 'MENU.UPLOAD.MAIN',
					bullet: 'dot',
					submenu: [
						{
							title: 'Dashboard',
							page: '/uploader/dashboard',
							translate: 'MENU.UPLOAD.DASHBOARD'
						},
						{
							title: 'Uploaded Files',
							page: '/uploader/files',
							translate: 'MENU.UPLOAD.FILES'
						},
						{ section: 'Galleries', translate: 'MENU.UPLOAD.GALLERY.MAIN' },
						{
							title: 'Galleries',
							page: '/uploader/galleries',
							translate: 'MENU.UPLOAD.GALLERY.LIST'
						},
						{
							title: 'Create Gallery',
							page: '/uploader/galleries/create',
							translate: 'MENU.UPLOAD.GALLERY.CREATE'
						}
					]
				},
				{
					title: 'Articles',
					root: true,
					icon: 'flaticon2-open-text-book',
					bullet: 'dot',
					translate: 'MENU.ARTICLE.MAIN',
					submenu: [
						{
							title: 'Dashboard',
							page: '/articles',
							translate: 'MENU.ARTICLE.DASHBOARD'
						},
						{
							title: 'Article-List',
							page: '/articles/list',
							translate: 'MENU.ARTICLE.LIST'
						},
						{
							title: 'Create Article',
							page: '/articles/create',
							translate: 'MENU.ARTICLE.CREATE'
						}
					]
				},
				{
					title: 'Matches',
					root: true,
					icon: 'flaticon2-calendar-4',
					bullet: 'dot',
					translate: 'MENU.MATCH.MAIN',
					submenu: [
						{
							title: 'Dashboard',
							page: '/matches',
							translate: 'MENU.MATCH.DASHBOARD'
						},
						{
							title: 'Match-List',
							page: '/matches/list',
							translate: 'MENU.MATCH.LIST'
						},
						{
							title: 'Import Matches',
							page: '/matches/import',
							translate: 'MENU.MATCH.IMPORT'
						},
						{
							title: 'Create Match',
							page: '/matches/create',
							translate: 'MENU.MATCH.CREATE'
						}
					]
				},
				{
					title: 'Newsletter',
					root: true,
					icon: 'flaticon2-new-email',
					bullet: 'dot',
					translate: 'MENU.NEWSLETTER.MAIN',
					submenu: [
						{
							title: 'Dashboard',
							page: '/newsletter',
							translate: 'MENU.NEWSLETTER.DASHBOARD'
						},
						{
							title: 'Newsletter-List',
							page: '/newsletter/list',
							translate: 'MENU.NEWSLETTER.LIST'
						},
						{
							title: 'Create Newsletter',
							page: '/newsletter/create',
							translate: 'MENU.NEWSLETTER.CREATE'
						},
						{
							title: 'Einstellungen',
							page: '/newsletter/settings',
							translate: 'MENU.NEWSLETTER.SETTINGS'
						}
					]
				},
				{ section: 'Club-Management', translate: 'MENU.CLUB.SECTION' },
				{
					title: 'Club',
					root: true,
					page: '/clubs',
					icon: 'flaticon-location',
				 	translate: 'MENU.CLUB.MAIN'
				},
				{
					title: 'Members',
					root: true,
					icon: 'flaticon-user',
					translate: 'MENU.MEMBER.MAIN',
					submenu: [
						{
							title: 'Dashboard',
							page: '/members',
							translate: 'MENU.MEMBER.DASHBOARD',
						},
						{
							title: 'Members',
							page: '/members/list',
							translate: 'MENU.MEMBER.LIST',
						},
						{
							title: 'Create Mmeber',
							page: '/members/create',
							translate: 'MENU.MEMBER.CREATE',
						},
						{
							title: 'Member of the Week',
							page: '/members/fame',
							translate: 'MENU.MEMBER.MOTW',
						}
					]
				},
				{
					title: 'Teams',
					root: true,
					icon: 'flaticon-users',
				 	translate: 'MENU.TEAM.MAIN',
					submenu: [
						{
							title: 'Dashboard',
							page: '/teams',
							translate: 'MENU.TEAM.DASHBOARD',
						},
						{
							title: 'Teams',
							page: '/teams/list',
							translate: 'MENU.TEAM.LIST',
						},
						{
							title: 'Create Team',
							page: '/teams/create',
							translate: 'MENU.TEAM.CREATE',
						},
						{
							title: 'Team of the Month',
							page: '/teams/fame',
							translate: 'MENU.TEAM.TOTM'
						}
					]
				},
				{
					title: 'Locations',
					root: true,
					icon: 'flaticon-map-location',
					translate: 'MENU.LOCATION.MAIN',
					submenu: [
						{
							title: 'Dashboard',
							page: '/locations',
							translate: 'MENU.LOCATION.DASHBOARD'
						},
						{
							title: 'Locations',
							page: '/locations/list',
							translate: 'MENU.LOCATION.LIST'
						},
						{
							title: 'Create Location',
							page: '/locations/create',
							translate: 'MENU.LOCATION.CREATE'
						},
						{
							title: 'Map',
							page: '/locations/map',
							translate: 'MENU.LOCATION.MAP'
						}
					]
				},
				{
					title: 'Sponsors',
					root: true,
					page: '/sponsors',
					icon: 'flaticon2-gift-1',
					translate: 'MENU.SPONSOR.MAIN'
				},
				{
					title: 'Categories',
					root: true,
					page: '/categories',
					icon: 'flaticon-layers',
					translate: 'MENU.CATEGORY.MAIN'
				},
				{ section: 'Settings', translate: 'MENU.SETTINGS.SECTION' },
				{
					title: 'Settings',
					root: true,
					page: '/settings',
					icon: 'flaticon2-console',
					translate: 'MENU.SETTINGS.SETTINGS'
				},
				{
					title: 'Analytics',
					root: true,
					page: '/analytics',
					icon: 'flaticon-analytics',
					translate: 'MENU.SETTINGS.ANALYTICS'
				},
				{
					title: 'Users',
					root: true,
					translate: 'MENU.SETTINGS.USER',
					icon: 'flaticon-users',
					bullet: 'dot',
					// permission: 'accessToUserManagementModule',
					submenu: [
						{
							title: 'Dashboard',
							page: '/users/dashboard',
							translate: 'MENU.DASHBOARD',
						},
						{
							title: 'Users',
							page: '/users/list',
							translate: 'MENU.USER.LIST',
						},
						{
							title: 'Roles',
							page: '/users/roles',
							translate: 'MENU.USER.ROLES'
						},
						{
							title: 'Permissions',
							page: '/users/permissions',
							translate: 'MENU.USER.PERMISSIONS'
						}
					]
				}
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
