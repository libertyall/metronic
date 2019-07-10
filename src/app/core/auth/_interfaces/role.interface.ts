import { BaseInterface } from '../../_base/crud';

export interface RoleInterface extends BaseInterface {
    id: string;
    title: string;
    permissions: string[];
    isCoreRole: boolean;
}

