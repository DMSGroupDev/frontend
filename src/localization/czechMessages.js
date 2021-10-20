const czechMessages = {
    ra: {
        action: {
            add_filter: 'Přidat filtr',
            add: 'Přidat',
            back: 'Zpět',
            bulk_actions: '1 vybraná položka |||| vybráno %{smart_count} položek',
            cancel: 'Zrušit',
            clear_input_value: 'Vymazat hodnotu',
            clone: 'Kopírovat',
            confirm: 'Potvrdit',
            create: 'Vytvořit',
            create_item: 'Vytvořit %{item}',
            delete: 'Odstranit',
            edit: 'Upravit',
            export: 'Export',
            list: 'Seznam',
            refresh: 'Obnovit',
            remove_filter: 'Odebrat tento filtr',
            remove: 'Odebrat',
            save: 'Uložit',
            search: 'Hledat',
            select_all: 'Vybrat vše',
            select_row: 'Vybrat tento řádek',
            show: 'Ukázat',
            sort: 'Třídit',
            undo: 'Zpět',
            unselect: 'Zrušit výběr',
            expand: 'Rozbalit',
            close: 'Zavřít',
            open_menu: 'Otevřít nabídku',
            close_menu: 'Zavřít nabídku',
            update: 'Aktualizovat',
            move_up: 'Nahodu',
            move_down: 'Dolů',
        },
        boolean: {
            true: 'Ano',
            false: 'Ne',
            null: ' ',
        },
        page: {
            create: 'Vytvořit %{name}',
            dashboard: 'Dashboard',
            edit: '%{name} #%{id}',
            error: 'Něco se pokazilo',
            list: '%{name}',
            loading: 'Načítání',
            not_found: 'Nenalezeno',
            show: '%{name} #%{id}',
            empty: 'Zatím není %{name}.',
            invite: 'Chcete přidat?',
        },
        input: {
            file: {
                upload_several:
                    'Přetáhněte soubory, které chcete nahrát, nebo kliknutím jeden vyberte.',
                upload_single: 'Přetáhněte soubor, který chcete nahrát, nebo kliknutím jej vyberte.',
            },
            image: {
                upload_several:
                    'Přetáhněte obrázky, které chcete nahrát, nebo kliknutím jeden vyberte.',
                upload_single:
                    'Chcete -li nahrát obrázek, přetáhněte jej nebo kliknutím vyberte.',
            },
            references: {
                all_missing: 'Nelze najít referenční data.',
                many_missing:
                    'Zdá se, že alespoň jeden z přidružených odkazů již není k dispozici.',
                single_missing:
                    'Související odkaz již není k dispozici.',
            },
            password: {
                toggle_visible: 'Skrýt heslo',
                toggle_hidden: 'Zobrazit heslo',
            },
        },
        message: {
            about: 'O',
            are_you_sure: 'Jste si jistý?',
            bulk_delete_content:
                'Opravdu chete položku %{name} odstranit? |||| Opravdu chcete odstranit %{smart_count} položek?',
            bulk_delete_title:
                'Odstranit %{name} |||| Odstranit %{smart_count} %{name}',
            bulk_update_content:
                'Opravdu chcete tuto položku aktualizovat %{name}? |||| Opravdu chcete aktualizovat %{smart_count} položek?',
            bulk_update_title:
                'Update %{name} |||| Update %{smart_count} %{name}',
            delete_content: 'Opravdu chcete tuto položku odstranit?',
            delete_title: 'Odstranit %{name} #%{id}',
            details: 'Podrobnosti',
            error:
                "Došlo k chybě klienta a váš požadavek nemohl být dokončen.",
            invalid_form: 'Formulář není platný. Zkontrolujte prosím chyby.',
            loading: 'Stránka se načítá, počkejte prosím',
            no: 'Ne',
            not_found:
                'Buď jste zadali špatnou adresu URL, nebo jste použili špatný odkaz.',
            yes: 'Ano',
            unsaved_changes:
                "Některé z vašich změn nebyly uloženy. Opravdu je chcete ignorovat?",
        },
        navigation: {
            no_results: 'Nebyly nalezeny žádné výsledky',
            no_more_results:
                'číslo stránky %{page} je mimo hranice. Zkuste předchozí stránku.',
            page_out_of_boundaries: 'Čístlo stránky %{page} je mimo hranice',
            page_out_from_end: 'Nelze přejít za poslední stránku',
            page_out_from_begin: 'Nelze přejít před první stránku',
            page_range_info: '%{offsetBegin}-%{offsetEnd} z %{total}',
            page_rows_per_page: 'Počet řádků na stránce:',
            next: 'Další',
            prev: 'Předchozí',
            skip_nav: 'Přeskočit na obsah',
        },
        sort: {
            sort_by: 'Seřadit podle %{field} %{order}',
            ASC: 'vzestupně',
            DESC: 'sestupně',
        },
        auth: {
            auth_check_error: 'Pro pokračování se prosím přihlaště',
            user_menu: 'Profil',
            username: 'Username',
            password: 'Heslo',
            sign_in: 'Přihlásit',
            sign_in_error: 'Ověření se nezdařilo, zkuste to znovu',
            logout: 'Odhlásit',
        },
        notification: {
            updated: 'Položka aktualizována |||| %{smart_count} položek aktualizováno',
            created: 'Položka vytvořena',
            deleted: 'Položka odstraněna |||| %{smart_count} položek odstraněno',
            bad_item: 'Nevalidní položka',
            item_doesnt_exist: 'Položka neexistuje',
            http_error: 'Chyba komunikace se serverem',
            data_provider_error:
                'DataProvider chyba. Podrobnosti najdete v konzoli.',
            i18n_error:
                'Nelze načíst překlady pro požadovaný jazyk',
            canceled: 'Akce zrušena',
            logged_out: 'Vaše relace skončila, znovu se přihlašte.',
            not_authorized: "Nemáte přístup k tomuto zdroji.",
        },
        validation: {
            required: 'Povinné',
            minLength: 'Musí být dlouhý alespoň %{min} znaků',
            maxLength: 'Nesmý být dělší než %{max} znaků',
            minValue: 'Musí být alespoň %{min}',
            maxValue: 'Nesmí být dělší než %{max}',
            number: 'Musí být číslo',
            email: 'Musí být validní email',
            oneOf: 'Musí být jeden z: %{options}',
            regex: 'Musí odpovídat konrétnímu formátu (regexp): %{pattern}',
        },
    },
};

export default czechMessages;