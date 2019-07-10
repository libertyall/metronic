import { BaseInterface } from '../../_base/crud';

export interface PermissionInterface extends BaseInterface {
    id: string;
    title: string;
    level: number;
    parentId: string;
    isSelected:  boolean;
    name: string;
    _children: PermissionInterface[];
}
