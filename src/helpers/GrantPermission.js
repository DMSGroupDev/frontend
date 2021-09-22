export const GrantPermission = (requestedRoles) => {
    const permittedRoles = JSON.parse(localStorage.getItem('userRoles'));
    var permitted = false;

    for (var role of permittedRoles) {
        if (requestedRoles[0] === role['userRoles'])
            permitted = true;
    }
    return permitted;
};