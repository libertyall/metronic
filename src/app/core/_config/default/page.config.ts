export class PageConfig {
	public defaults: any = {
		'dashboard': {
			page: {
				'title': 'Dashboard',
				'desc': 'Latest updates and statistic charts'
			}
		},
		categories: {
			page: {
				'title': 'Dashboard 123',
				'desc': 'Latest updates and statistic charts'
			}
		},
		settings: {
			page: {title: 'Settings', desc: ''}
		},
		users: {
			dashboard: {
				page: {title: 'User-Management Dashboard', desc: ''}
			},
			list: {
				page: {title: 'User-Management', desc: ''}
			},
			roles: {
				page: {title: 'Role-Management', desc: ''}
			}
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: { title: '403 Access Forbidden', desc: '', subheader: false }
			}
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
