export interface IInputField {
	type: string;
	options?: any | any[];
	selected: boolean | string | number | string[];
}


export interface BackendLayoutConfigModel {
	self: {
		layout?: IInputField;
		body?: {
			'background-image'?: {
				type: string;
				options: string[],
				selected: string
			}
		};
		logo?: {
			type: string;
			selected: {
				title: string;
				value: string;
			}[]
		};
	};
	/* portlet?: {
		sticky: {
			offset: IInputField;
		}
	};
	loader: {
		enabled: {
			type: string;
			selected: boolean;
		};
		type?: IInputField;
		logo?: string;
		message?: string;
	};
	colors: {
		state?: {
			brand: string;
			light: string;
			dark: string;
			primary: string;
			success: string;
			info: string;
			warning: string;
			danger: string;
		};
		base: {
			label: IInputField;
			shape: IInputField;
		}
	};
	width?: string;
	header: {
		self: {
			skin?: string;
			layout?: string;
			fixed: {
				desktop: IInputField;
				mobile: IInputField;
			}
		};
		topbar: {
			search: {
				display: IInputField;
				layout: IInputField;
				dropdown?: {
					style: IInputField;
				}
			};
			notifications: {
				display: IInputField;
				layout: IInputField;
				dropdown: {
					style: IInputField;
				}
			};
			'quick-actions': {
				display: IInputField;
				layout: IInputField;
				dropdown: {
					style: IInputField;
				}
			};
			user: {
				display: IInputField;
				layout: IInputField;
				dropdown: {
					style: IInputField;
				}
			};
			languages: {
				display: IInputField;
			};
			cart?: {
				display: IInputField;
			};
			'my-cart'?: any
			'quick-panel': {
				display: IInputField;
			}
		};
		search?: {
			display: IInputField;
		};
		menu?: {
			self: {
				display: IInputField;
				layout?: string;
				'root-arrow'?: IInputField;
			};
			desktop: {
				arrow: IInputField;
				toggle: string;
				submenu: {
					skin?: string;
					arrow: IInputField;
				}
			};
			mobile: {
				submenu: {
					skin: string;
					accordion: IInputField;
				}
			}
		}
	};
	brand?: {
		self: {
			skin: string
		}
	};
	aside?: {
		self: {
			skin?: string;
			display: IInputField;
			fixed?: IInputField;
			minimize?: {
				toggle: IInputField;
				default: IInputField;
			}
		};
		footer?: {
			self: {
				display: IInputField;
			}
		};
		menu: {
			dropdown: IInputField;
			scroll: IInputField;
			submenu: {
				accordion: IInputField;
				dropdown: {
					arrow: IInputField;
					'hover-timeout': number
				}
			}
		}
	};
	'aside-secondary'?: {
		self: {
			display: IInputField;
			layout: string
		}
	};
	subheader?: {
		display: IInputField;
		fixed?: IInputField;
		layout?: IInputField;
		style?: IInputField;
		daterangepicker?: {
			display: IInputField;
		}
	};
	content?: any;
	footer?: {
		self?: any;
	};
	'quick-panel'?: {
		display?: IInputField;
	}; */
}
