const cs = [{
    title: "DMS",
    
    // input validate
    invalidEmail: "formát emailu není validní",
    passwordInfo: "heslo musí obsahovat velké a malé písmeno, číslo a speciální znak a musí být delší než 7 znaků",
    invalidPassword: "formát hesla není validní",
    invalidTextValue: "hodnota je příliš krátká",
    invalidName: "jméno je příliš krátké",
    invalidSurname: "příjmení je příliš krátké",
    invalidCaptcha: "captcha se neschoduje",
    reloadCaptcha: "znovu načíst captchu",
    enterCaptcha: "zadejte hodnotu captcha",

    // registration form
    titleRegistration: "Registrace uživatele",
    userName: "Jméno",
    name: "Jméno",
    surname: "Příjmení",
    email: "Email",
    password: "Heslo",
    register: "Registrovat",
    registrationSuccess: " je nově registrovaný uživatel s uživatelským jménem ",
    backToLogin: "Máte již přihlašovací údaje? Přihlašte se",
    toLogin: "Přihlásit se",
    registrationSuccessEmail: "Registraci dokončíte potvrzením odkazu zaslaným emailem.",
    confirmRegistration: "Registrace je potvrzená. Nyní se můžete přihlásit.",
    unsuccessfulRegistration: "Během potvrzení registrace se vyskytla chyba. Zkuste to prosím později.",
    verified: "Probíhá ověřování, prosím počkejte...",

    //login
    titleLogin: "Přihlášení",
    login: "Přihlásit",
    loginSuccess: "Přihlášení bylo úspěšné",
    loginError: "Přihlašovací údaje nesouhlasí",
    newRegistration: "Ještě nemáte účet? Registrujte se",
    logout: "Odhlásit",

    //forgottenPassword
    forgottenPassword: "Zapomenuté heslo",
    newPassword: "Nové heslo",
    newPasswordConfirm: "Nové heslo znovu",
    resetPassword: "Uložit nové heslo",
    unsuccessResetPassword: "Během resetu hesla se vyskytla chyba. Zkuste to prosím později.",
    generateLinkPassword: "Odeslat email pro reset hesla",
    forgotPasswordEmail: "Změnu hesla dokončíte potvrzením odkazu zaslaným emailem",
    forgotPasswordConfirm: "Heslo je změněné. Nyní se můžete přihlásit.",
    invalidPasswordIdentical: "Hesla se neshodují",    

    //dashboard
    dashboard: "Dashboard",
    dashboardTitle: "Vítejte v DMS",
    dashboardContent: "Nyní můžete vytvářet domény a spravovat uživatele...",
    
    //users
    user: "Uživatel ",
    street: "Ulice",
    phone: "Telefon",
    website: "Webová stránka",
    companyName: "Společnost",
    users: "Uživatelé",
    userAdd: "Nový uživatel",
    userEdit: "Úprava uživatele",
    usersDescription: "Spravovat uživatele",
    usersGoTo: "K uživatelům",

    //inviteUsers
    inviteUsers: "Pozvání uživatelů",
    inviteUsersDescription: "Pozvat uživatele do DMS",
    inviteUsersGoTo: "Pozvat uživatele",
    inviteUsersInfo: "Pro pozvání uživatelů do DMS zadejte emaily (oddělené čárkou) a text, který se má v emailu zobrazit. Emaily je také možné importovat ze souboru csv nebo xlsx.",
    sendEmails: "Odeslat emaily",
    emails: "Emaily",
    emailsEmpty: "Pro odeslání pozvánky musí být zadán alespoň jeden email",
    emailText: "Text emailu",
    emailInvalid: " není validní",
    emailsInvalid: " nejsou validní",
    emailValid: "Emaily se připravují pro odeslání",
    invalidFile: "Při načtení dat ze souboru se vyskytla chyba",
    invalidFileFormat: "Formát souboru není podporovaný",
    upladFile: "Nahrát soubor",
    
    //domain
    domain: "Doména ",
    domainName: "Jméno domény",
    domainAdd: "Nová doména",
    domainEdit: "Úprava domény",
    domains: "Domény",
    domainDescription: "Spravovat domény",
    domainGoTo: "K doménám",
    domainSave: "Uložit doménu",
    domainCreate: "Vytvoření domény",
    domainTitle: "Vítejte ve webové aplikaci DMS!",
    domainInfo: "Jako první krok si prosím vytvořte název domény (například jméno firmy), která bude zastřešovat veškerou další práci s dokumenty a uživateli.",
    domainNotice: "Po validaci jména a uložení nebude možné název domény změnit",
    domainEmpty: "Název domény nesmí být prázdný",
    domainDuplicate: "Doména s tímto názvem již existuje, zvolte prosím jiný název",
    domainError: "Při vytváření domény se vyskytla chyba, zkuste to prosím později",
    
    //common
    search: "Vyhledat",

    //settings
    settings: "Nastavení",
    colorSettings: "Nastavení vlastního barevného schématu",
    colorSave: "Uložit barvy",
    colorPrimary: "Barva textu",
    colorSecondary: "Barva hlavičky",
    colorText: "Pro tento text je použita aktuálně vybraná barva",

    //myProfile
    myProfile: "Můj profil",
    profilSave: "Uložit změny",

    //dataProvider
    error1_notValid: " není validní hodnota",
    error2_duplicate: " již existuje",
    error3_minLenght: " je příliš krátký",
    error4_notEqual: " přihlašovací údaje nesouhlasí",
    error5_notFound: " nenalezen",
    error6_lockedOut: " je zablokovaný",
    error_otherErr: " neočekávaná chyba, zkuste to prosím později"
}];

export default cs;