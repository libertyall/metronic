import {Component, OnInit} from '@angular/core';
import {LayoutConfigService} from "../../../../core/_base/layout";
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {KeyValuePipe} from "@angular/common";
import {TreeService} from "../../services/tree.service";
import {ItemNode} from "../../_model/item-node.model";
import {ItemFlatNode} from "../../_model/item-flat-node.model";


@Component({
	selector: 'kt-settings-layout',
	templateUrl: './settings-layout.component.html',
	styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent implements OnInit {

	flatNodeMap = new Map<ItemFlatNode, ItemNode>();
	nestedNodeMap = new Map<ItemNode, ItemFlatNode>();
	treeControl: FlatTreeControl<ItemFlatNode>;
	treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
	dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

	placeholders: string[] = [];

	ngOnInit() {
	}

	constructor(private keyValuePipe: KeyValuePipe,
				private layoutConfigService: LayoutConfigService,
				private treeService: TreeService) {
		this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
		this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

		this.treeService.dataChange.subscribe(data => {
			this.dataSource.data = data;
		});
	}

	getLevel = (node: ItemFlatNode) => node.level;
	isExpandable = (node: ItemFlatNode) => node.expandable;
	getChildren = (node: ItemNode): ItemNode[] => node.children;
	hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;
	hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.item === '';

	/**
	 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
	 */
	transformer = (node: ItemNode, level: number) => {
		const existingNode = this.nestedNodeMap.get(node);
		const flatNode = existingNode && existingNode.item === node.item
			? existingNode
			: new ItemFlatNode();
		flatNode.item = node.item;
		flatNode.level = level;
		flatNode.expandable = !!node.children;
		flatNode.parentTitle = node.parentTitle;
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		return flatNode;
	}

	/* Get the parent node of a node */
	getParentNode(node: ItemFlatNode): ItemFlatNode | null {
		const currentLevel = this.getLevel(node);

		if (currentLevel < 1) {
			return null;
		}

		const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

		for (let i = startIndex; i >= 0; i--) {
			const currentNode = this.treeControl.dataNodes[i];

			if (this.getLevel(currentNode) < currentLevel) {
				return currentNode;
			}
		}
		return null;
	}

	getLabel(node): string {
		let titles = [];
		if (!node.item.type) {
			titles.push(node.item);
		} else {
			titles.push(node.parentTitle);
		}
		let savedNode = node;
		for (let i = 0; i < node.level; i++) {
			const testNode = this.getParentNode(savedNode);
			titles.push(testNode.item);
			savedNode = testNode;
		}
		const title = titles.reverse().join('.');
		if (!this.placeholders[title]) {
			this.placeholders[title] = 'settings.layout.options.' + title;
		}
		return this.placeholders[title];
	}

}
