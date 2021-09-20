import { GrantPermission } from './GrantPermission.js';

export const UnlockAccess = ({ children, request }) => {
    const permission = GrantPermission(request);
    return (
        <>
            {permission && children}
        </>
    );
};