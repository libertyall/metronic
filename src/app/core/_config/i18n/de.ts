// Germany
export const locale = {
	lang: 'de',
	data: {
		AUTH: {
			AGREE: {
				TEXT: 'Ich akzeptiere die ',
			},
			GENERAL: {
				OR: 'Oder',
				SUBMIT_BUTTON: 'Registrieren!',
				NO_ACCOUNT: 'Hast du kein Konto?',
				SIGNUP_BUTTON: 'Anmelden',
				FORGOT_BUTTON: 'Passwort vergessen',
				BACK_BUTTON: 'Zurück',
				PRIVACY: 'Privatsphäre',
				LEGAL: 'Legal',
				CONTACT: 'Kontakt',
			},
			LOGIN: {
				TITLE: 'Account erstellen',
				BUTTON: 'Anmelden',
			},
			FORGOT: {
				TITLE: 'Passwort vergessen?',
				DESC: 'Bitte gib Deine Email zum Zurücksetzen Deines Passwortes an.',
				SUCCESS: 'Eine E-Mail wurde zum Zurücksetzen wurde versendet.',
				SUBMIT_BUTTON: 'Erinnerung senden'
			},
			REGISTER: {
				TITLE: 'Registrierung',
				DESC: 'Fülle das Formular zur Anmeldung aus.',
				SUCCESS: 'Du hast Dich erfolgreich registriert. Bitte überprüfe Dein E-Mail Postfach.'
			},
			REMEMBERME: 'An mich erinnern?',
			INPUT: {
				EMAIL: 'E-Mail',
				DISPLAYNAME: 'Anzeigename',
				FIRSTNAME: 'Vorname',
				LASTNAME: 'Nachname',
				PASSWORD: 'Passwort',
				PASSWORDNOMATCH: 'Die beiden Passwörter stimmen nicht überein',
				CONFIRM_PASSWORD: 'Passwort bestätigen',
				USERNAME: 'Nutzername'
			},
			VALIDATION: {
				ACCEPTTERMS: 'Du musst noch den Nutzungs- und Datenschutzbestimmungen zustimmen.',
				INVALID: '{{name}} is not valid',
				REQUIRED: '{{name}} is required',
				MIN_LENGTH: '{{name}} minimum length is {{min}}',
				AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
				NOT_FOUND: 'Die angegebene {{name}} wurde nicht gefunden.',
				INVALID_LOGIN: 'The login detail is incorrect',
				SIGNUP: {
					'auth/email-already-in-use': 'Die angegebene E-Mail Adresse wird bereits benutzt. Benutz´ doch' +
						' die "Passwort vergessen" Funktion zum Senden einer Erinnerung.',
					'auth/weak-password': 'Dein Passwort ist zu schwach. Es werden mindestens 6 Zeichen benötigt.'
				},
				REQUIRED_FIELD: 'Eingabe fehlt',
				MIN_LENGTH_FIELD: 'Minimum field length:',
				MAX_LENGTH_FIELD: 'Maximum field length:',
				INVALID_FIELD: 'Diese Eingabe ist fehlerhaft.',
			}
		},
		category: {
			subheader: {
				title: 'Kategorien',
				desc: ''
			},
			list: {
				add: {
					short: 'Neue Kategorie',
					full: 'Neue Kategorie erstellen'
				},
				delete: 'Kategorie löschen',
				edit: 'Kategorie editieren',
				noEntries: 'Es wurden noch keine Kategorien gespeichert.',
				search: {
					hint: 'Suche nach dem Titel einer Kategorie',
					placeholder: 'Kategorien durchsuchen'
				},
				table: {
					actions: 'Aktionen',
					id: 'ID',
					title: 'Titel'
				},
				title: 'Alle Kategorien'
			}
		},
		general: {
			settings: {
				calendar: {
					addCalendar: 'Kalender hinzufügen',
					cssTitle: 'Farbe zur Anzeige der Termine',
					deleteCalendar: 'Kalender löschen',
					fieldTitle: 'Name des Kalenders',
					isActive: 'Ist der Kalender aktiviert?',
					link: 'Link zum Google Kalender',
					title: 'Eingebundene Kalender'
				},
				calendarTitle: 'Kalender',
				description: 'Hier können globale Einstellungen zur Seite vorgenommen werden.',
				downtime: {
					isActive: 'Wartungsmodus aktiviert?',
					message: 'Nachricht an die Benutzer',
					messageDescription: 'Diese Nachricht wird den Benutzern im Frontend angezeigt. Die' +
						' Administrations-Oberfläche ist weiterhin erreichbar.',
					title: 'Wartungsmodus'
				},
				layout: {
					form: {
						body: {
							'background-image': 'Hintergrundbild'
						},
						loader: {
							logo: 'Bild, das beim Laden angezeigt wird',
							message: 'Nachricht beim Laden',
							type: 'Wähle zwischen: spinner-logo, spinner-message und default'
						},
						logo: {
							brand: 'Brand-Logo',
							dark: 'Logo bei dunklem Design',
							green: 'Logo bei grünem Hintergrund',
							light: 'Logo bei hellem Hintergrund'
						},
						self: {
							layout: 'Fluid oder fixed Design?'
						},
						sticky: {
							offset: 'Porlets offset'
						}
					},
					input: {
						title: 'Layout',
						description: 'Wie soll das Layout aufgebaut werden?'
					},
					title: {
						frontend: 'Frontend-Seite',
						backend: 'Administrationbereich'
					},
					wizard: {
						self: {
							description: '',
							title: 'Self'
						},
						portlet: {
							description: '',
							title: 'Portlets'
						},
						loader: {
							description: '',
							title: 'Laden-Anzeige'
						},
						colors: {
							description: '',
							title: 'Farbgebung'
						},
						header: {
							description: '',
							title: 'Erste Kopfzeile'
						},
						subheader: {
							description: '',
							title: 'Zweite Kopfzeile'
						},
						brand: {
							description: '',
							title: 'Branding'
						},
						aside: {
							description: '',
							title: 'Seitliche Navigation'
						},
						footer: {
							description: '',
							title: 'Fußzeile'
						}
					}
				},
				layoutTitle: 'Layout Optionen',
				mailing: {
					addMailList: 'Neuen Verteiler anlegen',
					addEmail: 'E-Mail hinzufügen',
					deleteMailList: 'Verteiler löschen',
					fieldTitle: 'Name des Verteilers',
					isActive: 'Aktiviert?',
					title: 'E-Mail Verteiler'
				},
				mailingTitle: 'E-Mail Optionen',
				page: {
					description: 'Beschreibung',
					descriptionDescription: 'Beschreibung der Seite im Kopfbereich',
					emailDescription: 'E-Mail Adresse, die im Kopfbereich der Seite angezeigt wird.',
					emailTitle: 'E-Mail',
					keywords: 'Keywords der Seite',
					keywordsDescription: 'Keywords, die als Standard im Kopfbereich angezeigt werden.',
					name: 'Name der Seite',
					nameDescription: 'Name der Seite, wie er in der Titelleiste angezeigt wird.',
					title: 'Titel der Seite',
					titleDescription: 'Standard-Titel, der im Kopfbereich angezeigt wird.'
				},
				pageTitle: 'Seiteneinstellungen',
				title: 'Administration der Seite'
			}
		},
		global: {
			description: 'Dies ist ein geschützter Bereich.',
			login: {
				noAccountQuestion: 'Noch kein Account?',
				or: 'oder über',
				title: 'Anmeldung'
			},
			title: 'Administration'
		},
		ITEMS_PER_PAGE_LABEL: 'Einträge pro Seite',
		FIRST_PAGE_LABEL: 'Zur ersten Seite',
		LAST_PAGE_LABEL: 'Zur letzten Seite',
		NEXT_PAGE_LABEL: 'Nächste Seite anzeigen',
		PREVIOUS_PAGE_LABEL: 'Eine Seite zurückblättern',
		MENU: {
			ARTICLE: {
				CREATE: 'Artikel schreiben',
				DASHBOARD: 'Übersicht',
				LIST: 'Alle Artikel',
				MAIN: 'Artikel'
			},
			CALENDAR: 'Kalender',
			CATEGORY: {
				MAIN: 'Kategorien'
			},
			CLUB: {
				MAIN: 'Verein',
				SECTION: 'Vereinsverwaltung'
			},
			CONTENT: 'Inhalte',
			DASHBOARD: 'Startseite',
			LOCATION: {
				CREATE: 'Spielstätte erfassen',
				DASHBOARD: 'Übersicht',
				LIST: 'Alle Spielstätten',
				MAIN: 'Spielstätten',
				MAP: 'Kartenansicht'
			},
			MATCH: {
				CREATE: 'Spiel anlegen',
				DASHBOARD: 'Übersicht',
				IMPORT: 'Spielplan importieren',
				LIST: 'Alle Spiele',
				MAIN: 'Spiele'
			},
			MEMBER: {
				CREATE: 'Mitglied erstellen',
				DASHBOARD: 'Übersicht',
				LIST: 'Alle Mitglieder',
				MAIN: 'Mitglieder',
				MOTW: 'Mitglied der Woche'
			},
			NEWSLETTER: {
				CREATE: 'Newsletter schreiben',
				DASHBOARD: 'Übersicht',
				SETTINGS: 'Einstellungen',
				LIST: 'Bisherige Newsletter',
				MAIN: 'Newsletter'
			},
			SETTINGS: {
				ANALYTICS: 'Auswertungen',
				SECTION: 'Seiten-Administration',
				SETTINGS: 'Einstellungen',
				USER: 'Benutzer'
			},
			SPONSOR: {
				MAIN: 'Sponsoren'
			},
			TEAM: {
				CREATE: 'Mannschaft erstellen',
				DASHBOARD: 'Übersicht',
				LIST: 'Alle Mannschaften',
				MAIN: 'Mannschaften',
				TOTM: 'Mannschaft des Monats'
			},
			UPLOAD: {
				DASHBOARD: 'Übersicht',
				FILES: 'Hochgeladene Dateien',
				GALLERY: {
					MAIN: 'Galerien',
					LIST: 'Alle Galerien',
					CREATE: 'Neue Galerie'
				},
				MAIN: 'Mediencenter'
			}
		},
		pleaseWait: 'Bitte warten',
		TRANSLATOR: {
			SELECT: 'Wähle deine Sprache',
		}
	}
};
