import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {LayoutConfigService} from "../../../core/_base/layout";
import {ItemNode} from "../_model/item-node.model";

@Injectable({providedIn: 'root'})
export class TreeService {
	dataChange = new BehaviorSubject<ItemNode[]>([]);

	get treeData(): ItemNode[] {
		return this.dataChange.value;
	}

	constructor(private layoutConfigService: LayoutConfigService) {
		this.initialize();
	}

	initialize() {
		const treeData = this.buildFileTree(this.layoutConfigService.getConfig(), 0);
		console.log(treeData);
		this.dataChange.next(treeData);
	}

	/**
	 * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
	 * The return value is the list of `TodoItemNode`.
	 */
	buildFileTree(obj: { [key: string]: any }, level: number, parentNode?: string): ItemNode[] {
		return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
			const value = obj[key];
			const node = new ItemNode();
			node.item = key;

			node.parentTitle = key;

			if (value != null) {
				if (typeof value === 'object' && !(['text', 'multi-select', 'select', 'checkbox', 'number', 'radio'].includes(value.type))) {
					node.children = this.buildFileTree(value, level + 1, key);
				} else {
					node.item = value;
				}
			}

			return accumulator.concat(node);
		}, []);
	}
}
