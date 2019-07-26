// Germany
export const locale = {
	lang: 'de',
	data: {
		actions: 'Aktionen',
		'auth/logged-out': 'Du wurdest aus dem System ausgeloggt.',
		'auth/not-verified': 'Du hast Deine E-Mail Adresse noch nicht bestätigt.',
		'auth/email-already-in-use': 'Die verwendete E-Mail Adresse ist bereits in unserem System gespeichert. Nutze eine andere Adresse oder lass Dir Dein Passwort per Mail zusenden.',
		'auth/invalid-email': 'Du hast keine gültige E-Mail Adresse eingegeben. Bitte überprüfe Deine Eingabe.',
		'auth/reminder-sent': 'Eine E-Mail mit neuen Daten wurde versendet.',
		'auth/too-many-requests': 'Du hast zu viele Anfragen gesendet.',
		'auth/user-not-found': 'Es wurde kein Benutzer mit diesen Daten gefunden.',
		'auth/argument-error': 'Es ist ein Systemfehler aufgetreten. Bitte versuche es zu einem späteren Zeitpunkt erneut.',
		'auth/user-disabled': 'Dein Benutzeraccount wurde von einem Administrator deaktiviert.',
		'auth/operation-not-allowed': 'Diese Login-Methode wurde gesperrt.',
		'auth/account-exists-with-different-credential': 'Es existiert bereits ein Benutzer der diese Mail-Adresse verwendet.',
		'auth/wrong-password': 'Du hast ein falsches Passwort für diesen Account angegeben.',
		'auth/send-verification': 'Eine weitere E-Mail zur Bestätigung Deines Accounts wurde Dir gesendet.',
		'auth/register-success': 'Deine Registrierung war erfolgreich! Nach dem Bestätigen Deiner E-Mail Adresse muss Dein Account noch von einem Administrator freigegeben werden.',
		articles: {
			calendar: {
				addArticle: 'Neuer Artikel',
				title: 'Veröffentlichungskalender',
			},
			dashboard: {
				stats: {
					description: 'Artikel nach ihrem Status',
					title: 'Statistik'
				},
				top: {
					description: 'Meistgelesen und meistkommentiert',
					title: 'Top Artikel'
				}
			},
			form: {
				options: {
					show: 'Optionen',
					title: 'Optionen'
				},
				publish: {
					button: 'Fertig',
					draft: 'Als Entwurf',
					live: {
						text: 'Jetzt veröffentlichen',
						description: 'Der Artikel wird direkt angezeigt.'
					},
					schedule: {
						text: 'Für später planen',
						description: 'Wähle ein Datum!'
					},
					menuButton: 'Veröffentlichung',
					question: 'Wann soll der Artikel veröffentlicht werden?'
				},
				status: {
					edit: 'Editieren',
					error: 'NICHT gespeichert',
					new: 'Neu',
					saving: 'Speichere ...',
					success: 'Gespeichert',
					title: 'Status'
				},
				tabs: {
					input: 'Texteingabe',
					preview: 'Vorschau'
				},
				textPlaceholder: 'Fang´ mit Deiner Geschichte an ...',
				titlePlaceholder: 'Der Titel Deines Artikels?'
			},
			publication: {
				planned: 'geplant{{value}}',
				published: 'veröffentlicht{{value}}',
				unpublished: 'Entwürfe'
			}
		},
		AUTH: {
			AGREE: {
				TEXT: 'Ich akzeptiere die '
			},
			ERRORS: {
				'auth/wrong-password': 'Das eingegebene Passwort ist nicht korrekt.',
				'auth/user-not-found': 'Es wurde kein Benutzer mit diesen Daten gefunden.',
				'auth/user-disabled': 'Dein Benutzeraccount wurde deaktiviert.'
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
				CONTACT: 'Kontakt'
			},
			LOGIN: {
				TITLE: 'Account erstellen',
				BUTTON: 'Anmelden',
				VERIFYEMAIL: 'Du musst Deine E-Mail Adresse noch bestätigen. Erst danach kannst Du Dich am System' +
					' anmelden.'
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
				INVALID_FIELD: 'Diese Eingabe ist fehlerhaft.'
			}
		},
		author: 'Author',
		back: 'Zurück',
		cancel: 'Abbrechen',
		cancelTooltip: 'Verwerfen und Vorgang abbrechen!',
		category: {
			delete: {
				description: 'Die Kategorie kann danach nicht wieder hergestellt werden. Alle verknüpften Einträge' +
					' verlieren dann ihre Gültigkeit.',
				title: 'Möchtest Du wirklich die Kategorie ´{{title}}` löschen?'
			},
			deleted: 'Die Kategorie wurde unwiderruflich gelöscht.',
			deleteInProgress: 'Die Kategorie wird gelöscht. Bitte warten ...',
			createTitle: 'Eine neue Kategorie erstellen',
			editTitle: 'Kategorie {{title}} editieren',
			backToList: 'Zur Liste mit allen Kategorien',
			subheader: {
				title: 'Kategorien',
				desc: ''
			},
			edit: {
				goToList: 'Zur Liste aller Kategorien',
				isImported: 'Kategorie wurde importiert',
				isMainCategory: 'Ja, es handelt sich um eine Hauptkategorie',
				hints: {
					description: 'Eine kurze Info / Beschreibung dieser Kategorie',
					isImported: 'Wurde diese Kategorie durch ein Skript importiert?',
					mainCategory: 'Soll die Kategorie als Hauptkategorie (z.B. im Menü) angezeigt werden?',
					parentCategory: 'Zu welcher übergeordneten Kategorie gehört der Eintrag?',
					title: 'Bitte den Namen der Kategorie eingeben',
				},
				inputs: {
					parentCategory: 'Übergeordnete Kategorie',
					title: 'Name der Kategorie'
				},
				tabs: {
					creation: {
						title: 'Erstellung und Veröffentlichung'
					},
					main: {
						title: 'Wichtigste Daten'
					}
				}
			},
			list: {
				add: {
					short: 'Neue Kategorie',
					full: 'Neue Kategorie erstellen'
				},
				delete: 'Kategorie löschen',
				detail: 'Details anzeigen',
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
		comments: 'Kommentare',
		cssClasses: {
			danger: 'rot',
			dark: 'dunkel',
			info: 'blau',
			light: 'hell',
			primary: 'Primär',
			secondary: 'Sekundär',
			success: 'grün',
			warning: 'orange',
		},
		date: {
			allTime: 'Gesamt',
			month: 'dieser Monat',
			week: 'diese Woche'
		},
		delete: 'Löschen',
		dialog: {
			canceledMessage: 'Der Vorgang wurde auf Deinen Wunsch hin abgebrochen.',
			formErrorMessage: 'Hoppla! Es scheint, als wären nicht alle Angaben korrekt. Bitte überprüfe Deine' +
				' Eingaben.',
			titleIs: 'Der Titel ist '
		},
		FIRST_PAGE_LABEL: 'Zur ersten Seite',
		forms: {
			errors: {
				required: 'Hier ist eine Eingabe erforderlich.',
				minLength: 'Deine Eingabe ist zu kurz. Es werden mindestens {{minLength}} Zeichen benötigt.',
				maxLength: 'Deine Eingabe ist zu lang. Es können maximal {{maxLength}} Zeichen eingegeben werden.',
				title: 'Hoppla!',
				description: 'Deine Eingaben sind noch fehlerhaft. Bitte überprüfe das Formular noch einmal auf Fehler.'
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
		LAST_PAGE_LABEL: 'Zur letzten Seite',
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
			PAGES: 'Seiten',
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
			},
			USER: {
				LIST: 'Benutzerliste',
				PERMISSIONS: 'Berechtigungen',
				ROLES: 'Rollen'
			}
		},
		NEXT_PAGE_LABEL: 'Nächste Seite anzeigen',
		pleaseWait: 'Bitte warten',
		PREVIOUS_PAGE_LABEL: 'Eine Seite zurückblättern',
		readMore: 'Weiterlesen',
		required: 'erforderlich',
		reset: 'Zurücksetzen',
		resetDescription: 'Das Formular zurücksetzen',
		save: 'Speichern',
		saveDescription: 'Speichern und Fortfahren',
		saveToList: 'Speichern und zur Übersicht',
		saveToListDescription: 'Speichern und zur Listenansicht zurückkehren',
		settings: {
			calendars: {
				add: 'Kalender hinzufügen',
				delete: 'Kalender löschen',
				hints: {
					link: 'Der Link zum Kalender',
				},
				placeholder: {
					cssClass: 'CSS-Klasse (Farbgebung der Termine)',
					isActive: 'Termine anzeigen?',
					link: 'Google-Kalender-ID',
					title: 'Name des Kalenders'
				},
				title: 'Verknüpfte Kalender',
			},
			layout: {
				options: {
					backend: {
						title: 'Admin-Oberfläche',
						aside: {
							footer: {
								self: {
									display: 'Footer anzeigen',
									title: 'Menü-Fußzeilen-Optionen'
								},
								title: 'Menü-Fußzeilen'
							},
							menu: {
								title: 'Menü'
							},
							self: {
								display: 'Menü anzeigen?',
								title: 'Menü-Darstellung',
								fixed: 'Fixiertes Menü',
								minimize: {
									default: 'Default',
									title: 'Menü minimieren',
									toggle: 'Menü auf-/ und zuklappbar'
								}
							},
							title: 'Menü',
						},
						brand: {
							title: 'Branding'
						},
						colors: {
							base: {
								title: 'Basisfarben'
							},
							title: 'Farbgebung',
							state: {
								brand: {
									title: 'Brand'
								},
								danger: {
									title: 'Fehler'
								},
								dark: {
									title: 'Dunkel'
								},
								info: {
									title: 'Info'
								},
								light: {
									title: 'Hell'
								},
								primary: {
									title: 'Primär'
								},
								success: {
									title: 'Erfolg'
								},
								title: 'Farben für verschiedene Stati',
								warning: {
									title: 'Warnungen'
								},
							}
						},
						content: {
							'fit-top': 'Content Fit Top Title',
							width: 'Content width Title',
							title: 'Inhalt'
						},
						footer: {
							title: 'Fußzeile',
							self: {
								fixed: 'Fußzeile fixieren',
								title: 'Fußzeilen-Optionen'
							}
						},
						header: {
							title: 'Erste Kopfzeile'
						},
						loader: {
							enabled: 'Ladeanzeige aktivieren',
							title: 'Ladeanzeige',
							type: 'Art der Anzeige',
							logo: 'Logo für den Ladebildschirm',
							message: 'Nachricht während dem Ladevorgang'
						},
						portlet: {
							title: 'Boxen / Portlets',
							sticky: {
								title: 'Fixierte Portlets',
								offset: 'Offset Size in Pixel'
							},
						},
						self: {
							layout: 'Layout',
							body: {
								'background-image': 'Hintergrundbild',
								title: 'Body Layout'
							},
							logo: {
								title: 'Logo'
							},
							mainLogo: 'Hauptlogo',
							stickyLogo: 'Festes Logo',
							title: 'SELF??????'
						},
						subheader: {
							title: 'Zweite Kopfzeile'
						}
					},
					frontend: {
						title: 'Homepage'
					},
				},
				title: 'Layout-Optionen'
			},
			links: {
				add: 'Link hinzufügen',
				delete: 'Link löschen',
				hints: {
					noUrl: 'Dies ist keine gültige URL',
					url: 'Die URL des Links'
				},
				placeholder: {
					displayInFooter: 'Anzeige im Footer?',
					displayInHeader: 'Anzeige im Header?',
					icon: 'Soll ein Icon angezeigt werden?',
					isActive: 'Link anzeigen?',
					isMailLink: 'Ist es eine E-Mail Adresse?',
					target: 'Wie soll der Link geöffnet werden?',
					url: 'URL des Links',
					title: 'Name des Links',
				},
				target_blank: 'Neues Fenster',
				target_self: 'Selbes Fenster',
				title: 'Links'
			},
			mailing: {
				add: 'Neuer Verteiler',
				delete: 'Liste löschen',
				placeholder: {
					emails: 'E-Mail Empfängerliste',
					isActive: 'Verteiler aktiv?',
					title: 'Name der E-Mail-Liste'
				},
				title: 'E-Mail Verteiler'
			},
			main: {
				downtime: 'Wartungsmodus',
				hints: {
					email: 'E-Mail Adresse für Benachrichtigungen',
					subTitle: 'Untertitel für die Statuszeile',
					title: 'Der Titel, der in der Statuszeile angezeigt wird',
					link: 'Link {{moreText}}'
				},
				placeholder: {
					assignedKeywords: {
						text: 'Komma-separierte Liste mit Schlagwörtern',
						title: 'Verknüpfte Schlagwörter'
					},
					description: {
						text: 'Gib hier eine kurze Beschreibung (max XX Zeichen) für Suchmaschinen an',
						title: 'Beschreibung für Suchmaschinen.'
					},
					downtime: {
						headerTitle: 'Wartungsmodus',
						isEnabled: {
							text: 'Wartungsmodus aktiviert?',
							title: 'Soll die Seite in den Wartungsmodus gesetzt werden?'
						},
						message: {
							text: 'Schreib hier kurz, warum die Seite im Wartungsmodus ist, wie lange es dauert etc.',
							title: 'Hinweistext für die Benutzer'
						}
					},
					email: 'E-Mail',
					isEnabled: {
						text: 'Ist die Seite aktiviert?',
						title: 'Seite aktiv'
					},
					registration: {
						defaultRole: {
							placeholder: 'Standard-Rolle für die Neuanmeldung?',
							title: 'Welche Rolle sollen Benutzer nach einer erfolgreichen Registrierung erhalten?'
						},
						isEnabled: {
							text: 'Registrierung aktiviert?',
							title: 'Dürfen sich Benutzer neu registrieren?'
						},
						title: 'Registrierung'
					},
					subTitle: 'Untertitel',
					title: 'Titel der Seite'
				},
				registration: 'Registrierung',
				title: 'Grundeinstellungen'
			},
			/* calendar: {
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
			 */
			subheader: {
				title: 'Einstellungen',
				desc: ''
			}
		},
		TRANSLATOR: {
			SELECT: 'Wähle deine Sprache'
		},
		undo: 'Rückgängig machen',
		user: {
			dashboard: {
				description: 'In diesem Bereich können Benutzer verwaltet und Rollen vergeben oder entzogen werden.',
				title: 'Benutzer- und Rollenverwaltung'
			},
			list: {
				create: {
					tooltip: 'Einen neuen Benutzer anlegen',
					title: 'Neuer Benutzer'
				},
				delete: {
					one: 'Benutzer löschen',
					title: 'Alle löschen',
					tooltip: 'Alle ausgewählten Benutzer löschen'
				},
				detail: 'Details anzeigen',
				edit: 'Benutzer editieren',
				noRoles: 'keine',
				search: {
					description: '',
					fields: 'Vorname, Nachname, E-Mail und Anzeigename',
					placeholder: 'Benutzer suchen ...',
					title: 'Suche nach '
				},
				selectedCount: 'Es wurden {{count}} Benutzer ausgewählt.',
				table: {
					id: 'Id',
					assignedRoles: 'Verknüpfte Rollen',
					displayName: 'Anzeigename',
					email: 'E-Mail',
					firstName: 'Vorname',
					lastName: 'Nachname'
				},
				title: 'Registrierte Benutzer'
			},
			permission: {
				create: {
					title: 'Berechtigung erstellen',
					tooltip: 'Eine neue Berechtigung erstellen'
				},
				delete: {
					one: 'Berechtigung löschen',
					title: 'Berechtigungen löschen',
					tooltip: 'Alle ausgewählten Berechtigungen löschen.'
				},
				dialog: {
					name: {
						placeholder: 'Name der Berechtigung',
						pleaseEnter: 'Bitte gib den Namen für die Berechtigung an.'
					},
					parentId: {
						none: 'Keine übergeordnete Berechtigung',
						placeholder: 'Übergebordnete Berechtigung'
					},
					saveTooltip: 'Berechtigung speichern',
					title: {
						edit: 'Die Berechtigung {{permission}} editieren',
						new: 'Neue Berechtigung erstellen',
						placeholder: 'Titel der Berechtigung',
						pleaseEnter: 'Bitte gib den Titel der Berechtigung an.'
					}
				},
				detail: 'Details anzeigen',
				edit: 'Berechtigung editieren',
				permissions: {
					title: 'Berechtigungen'
				},
				search: {
					fields: 'Titel',
					placeholder: 'Nach Berechtigungen suchen ...',
					title: 'Suchen nach'
				},
				selectedCount: 'Es wurden {{count}} Berechtigungen ausgewählt.',
				table: {
					id: 'Id',
					title: 'Titel'
				},
				title: 'Berechtigungen'
			},
			role: {
				create: {
					title: 'Rolle erstellen',
					tooltip: 'Eine neue Rolle erstellen'
				},
				delete: {
					one: 'Rolle löschen',
					title: 'Rollen löschen',
					tooltip: 'Alle ausgewählten Rollen löschen'
				},
				dialog: {
					saveTooltip: 'Rolle speichern',
					title: {
						edit: 'Die Rolle {{role}} editieren',
						new: 'Neue Rolle erstellen',
						placeholder: 'Titel der Rolle',
						pleaseEnter: 'Bitte gib den Titel der Rolle an.'
					}
				},
				detail: 'Details anzeigen',
				edit: 'Rolle editieren',
				permissions: {
					title: 'Berechtigungen'
				},
				search: {
					fields: 'Titel',
					placeholder: 'Nach Rollen suchen ...',
					title: 'Suchen nach'
				},
				selectedCount: 'Es wurden {{count}} Rollen ausgewählt.',
				table: {
					id: 'Id',
					title: 'Titel'
				},
				title: 'Rollen'
			},
			roles: {
				admin: 'Administrator'
			},
			subheader: {
				desc: '',
				title: 'Benutzer'
			}
		},
		views: 'Ansichten'
	}
};
