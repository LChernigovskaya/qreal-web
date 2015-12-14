/*
 * Copyright Vladimir Zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class DiagramController {
    static robotsDiagramNode: RobotsDiagramNode;
    private graph: joint.dia.Graph = new joint.dia.Graph;
    private paper: DiagramPaper = new DiagramPaper(this, this.graph);

    private diagramLoader: DiagramLoader;
    private exportManager: ExportManager;
    private subprogramDiagramNodes: SubprogramDiagramNode[] = [];
    private nodeTypesMap: NodeTypesMap = {};
    private nodesMap = {};
    private linksMap = {};
    private currentElement: DiagramElement;
    private isPaletteLoaded = false;
    private taskId: string;
    private rootController: RootDiagramController;
    private paperZoom: number = 0.8;

    constructor($scope, $compile, $attrs) {
        this.paper.scale(this.paperZoom, this.paperZoom);
        var controller: DiagramController = this;
        $scope.vm = controller;
        this.rootController = $scope.root;

        controller.taskId = $attrs.task;
        this.diagramLoader = new DiagramLoader(this, this.graph);
        this.exportManager = new ExportManager();
        new ElementsTypeLoader(controller, controller.taskId).load($scope, $compile);

        this.initDeleteListener();

        this.makeUnselectable(document.getElementById("diagramContent"));

        this.paper.on('cell:pointerdown',
            function (cellView, event, x, y) {
                if (!($(event.target).parents(".custom-menu").length > 0)) {
                    $(".custom-menu").hide(100);
                }

                var node: DiagramNode = controller.nodesMap[cellView.model.id];
                if (node) {
                    controller.setCurrentElement(node);
                    controller.setNodeProperties(node);
                } else {
                    var link: Link = controller.linksMap[cellView.model.id];
                    if (link) {
                        controller.setCurrentElement(link);
                        controller.setNodeProperties(link);
                    } else {
                        controller.clearCurrentElement();
                    }
                }

                if (event.button == 2) {
                    $(".custom-menu").finish().toggle(100).
                        css({
                            left: event.clientX + "px",
                            top: event.clientY + "px"
                        });
                }
            }
        );
        this.paper.on('blank:pointerdown',
            (event, x, y) => {
                if (!($(event.target).parents(".custom-menu").length > 0)) {
                    $(".custom-menu").hide(100);
                }
                $(".property").remove();
                if (controller.currentElement) {
                    this.clearCurrentElement();
                }
            }
        );

        $scope.submit = function() { controller.submit($scope) };
        $('#diagramSpinner').hide();
        $('#twoDModelSpinner').hide();

        this.initCustomContextMenu();
    }

    setCurrentElement(element) {
        if (this.currentElement) {
            this.unselectElement(this.currentElement.getJointObject());
        }
        this.currentElement = element;
        this.selectElement(this.currentElement.getJointObject());
    }

    clearCurrentElement() {
        if (this.currentElement) {
            this.unselectElement(this.currentElement.getJointObject());
            this.currentElement = undefined;
        }
    }

    selectElement(jointObject): void {
        var jQueryEl = this.paper.findViewByModel(jointObject).$el;
        var oldClasses = jQueryEl.attr('class');
        jQueryEl.attr('class', oldClasses + ' selected');
    }

    unselectElement(jointObject): void {
        var jQueryEl = this.paper.findViewByModel(jointObject).$el;
        var removedClass = jQueryEl.attr('class').replace(new RegExp('(\\s|^)selected(\\s|$)', 'g'), '$2');
        jQueryEl.attr('class', removedClass);
    }

    initCustomContextMenu(): void {
        var controller = this;
        $("#diagramContent").bind("contextmenu", function (event) {
            event.preventDefault();
        });

        $(".custom-menu li").click(function(){
            switch($(this).attr("data-action")) {
                case "delete":
                    controller.removeCurrentElement();
                    break;
            }

            $(".custom-menu").hide(100);
        });
    }

    initDeleteListener(): void {
        var controller = this;
        var deleteKey: number = 46;
        $('html').keyup(function(e){
            if(e.keyCode == deleteKey) {
                if(!(document.activeElement.tagName === "INPUT")) {
                    console.log(document.activeElement.tagName);
                    controller.removeCurrentElement();
                }
            }
        });
    }

    setNodeTypesMap(nodeTypesMap: NodeTypesMap): void {
        this.nodeTypesMap = nodeTypesMap;
    }

    private makeUnselectable(element) {
        if (element.nodeType == 1) {
            element.setAttribute("unselectable", "on");
        }
        var child = element.firstChild;
        while (child) {
            this.makeUnselectable(child);
            child = child.nextSibling;
        }
    }

    initPalette($scope, $compile) {
        this.initDragAndDrop();
        this.isPaletteLoaded = true;
        this.afterPaletteLoaded($scope, $compile);
    }

    setInputStringListener(): void {
        var controller: DiagramController = this;
        $(document).on('input', '.form-control', function () {
            var key = $(this).data('type');
            var value = $(this).val();
            var property: Property = controller.currentElement.getChangeableProperties()[key];
            property.value = value;
            controller.currentElement.setProperty(key, property);
        });
    }

    setCheckboxListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.checkbox', function () {
            var key = $(this).data('type');
            var property: Property = controller.currentElement.getChangeableProperties()[key];
            var currentValue = property.value;

            var tr = $(this).closest('tr');
            var label = tr.find('label');
            if (currentValue === "true") {
                currentValue = "false"
                label.contents().last()[0].textContent = $(this).data("false");
            } else {
                currentValue = "true"
                label.contents().last()[0].textContent =  $(this).data("true");
            }
            property.value = currentValue;
            controller.currentElement.setProperty(key, property);
        });
    }

    setDropdownListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.mydropdown', function () {
            var key = $(this).data('type');
            var value = $(this).val();
            var property: Property = controller.currentElement.getChangeableProperties()[key];
            property.value = value;
            controller.currentElement.setProperty(key, property);
        });
    }

    setSpinnerListener(): void {
        var controller: DiagramController = this;
        $(document).on('change', '.spinner', function () {
            var key = $(this).data('type');
            var value = $(this).val();
            if (value !== "" && !isNaN(value)) {
                var property: Property = controller.currentElement.getChangeableProperties()[key];
                property.value = value;
                controller.currentElement.setProperty(key, property);
            }
        });
    }

    private initCombobox(typeName: string, propertyKey: string, element) {
        var variantsList = VariantListManager.getVariantList(typeName, propertyKey);

        var controller: DiagramController = this;

        element.find('input').autocomplete({
            source: variantsList,
            minLength: 0,
            select: function (event, ui) {
                var key = $(this).data('type');
                var value = ui.item.value;
                var property: Property = controller.currentElement.getChangeableProperties()[key];
                property.value = value;
                controller.currentElement.setProperty(key, property);
            }
        }).focus(function() {
            $(this).autocomplete("search", $(this).val());
        });
    }

    initDragAndDrop(): void {
        var controller: DiagramController = this;
        $(".tree_element").draggable({
            helper: function () {
                var clone =  $(this).find('.elementImg').clone();
                clone.css('position','fixed');
                clone.css('z-index', '1000');
                return clone;
            },
            cursorAt: {
                top: 15,
                left: 15
            },
            revert:"invalid"
        });

        $("#diagram_paper").droppable({
            drop: function(event, ui) {
                var topElementPos: number = (ui.offset.top - $(this).offset().top + $(this).scrollTop()) / controller.paperZoom;
                var leftElementPos: number = (ui.offset.left - $(this).offset().left + $(this).scrollLeft()) / controller.paperZoom;
                var gridSize: number = controller.paper.getGridSizeValue();
                topElementPos -= topElementPos % gridSize;
                leftElementPos -= leftElementPos % gridSize;

                var type = $(ui.draggable.context).data("type");
                var image: string = controller.nodeTypesMap[type].getImage();
                var name: string = controller.nodeTypesMap[type].getName();

                var typeProperties: PropertiesMap = controller.nodeTypesMap[type].getPropertiesMap();

                var nodeProperties: PropertiesMap = {};
                for (var property in typeProperties) {
                    nodeProperties[property] = new Property(typeProperties[property].name, typeProperties[property].type,
                        typeProperties[property].value);
                }

                var node = controller.createNode(name, type, leftElementPos, topElementPos, nodeProperties, image);
                controller.setCurrentElement(node);
                controller.setNodeProperties(node);
            }
        });
    }

    private setNodeProperties(element): void {
        $('#property_table tbody').empty();
        var properties: PropertiesMap = element.getChangeableProperties();
        for (var property in properties) {
            var newItem = $(this.getPropertyHtml(element.getType(), property, properties[property]));
            $('#property_table tbody').append(newItem);

            if (properties[property].type === "combobox") {
                this.initCombobox(element.getType(), property, newItem);
            }
        }
    }

    getNodeTypesMap(): NodeTypesMap {
        return this.nodeTypesMap;
    }

    getPropertyHtml(typeName, propertyName: string, property: Property): string {
        return PropertyManager.getPropertyHtml(typeName, propertyName, property);
    }

    afterPaletteLoaded($scope, $compile) {
        this.setInputStringListener();
        this.setCheckboxListener();
        this.setDropdownListener();
        this.setSpinnerListener();
        this.makeUnselectable(document.getElementById("paletteContent"));
        this.openDiagram($scope, $compile, this.taskId);
    }

    addLink(linkId: string, linkObject: Link): void {
        this.linksMap[linkId] = linkObject;
    }

    addSubprogramDiagramNode(node: SubprogramDiagramNode): void {
        this.subprogramDiagramNodes.push(node);
    }

    createNode(name: string, type: string, x: number, y: number, properties: PropertiesMap,
                      imagePath: string, id?: string): DiagramNode {
        var node: DiagramNode = new DefaultDiagramNode(name, type, x, y, properties, imagePath, id);
        this.nodesMap[node.getJointObject().id] = node;
        this.graph.addCell(node.getJointObject());
        return node;
    }

    clear(): void {
        this.graph.clear();
        this.nodesMap = {};
        this.linksMap = {};
        $(".property").remove();
        this.clearCurrentElement();
    }

    removeCurrentElement(): void {
        var controller = this;
        if (this.currentElement) {
            var node = this.nodesMap[this.currentElement.getJointObject().id];
            if (node) {
                var links = this.graph.getConnectedLinks(node.getJointObject(), { inbound: true, outbound: true });

                links.forEach(function (link) {
                    delete controller.linksMap[link.id];
                });

                delete this.nodesMap[this.currentElement.getJointObject().id];
            } else {
                var link = this.linksMap[this.currentElement.getJointObject().id];
                if (link) {
                    delete this.linksMap[this.currentElement.getJointObject().id];
                }
            }
            this.currentElement.getJointObject().remove();
            $(".property").remove();
            this.currentElement = undefined;
        }
    }

    submit($scope): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        $("#infoAlert").hide();
        var twoDModelSpinner = $('#twoDModelSpinner');
        twoDModelSpinner.show();
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'submit/' + controller.taskId,
            dataType: 'json',
            contentType: 'application/json',
            timeout: 60000,
            data: (JSON.stringify({diagram: controller.exportManager.exportDiagramStateToJSON(controller.graph,
                controller.nodesMap, controller.linksMap)})),
            success: function (response) {
                twoDModelSpinner.hide();
                $scope.$emit("emitCheckingResult", response);
            },
            error: function (response, status, error) {
                twoDModelSpinner.hide();
                if (status == "timeout") {
                    alert("Timed out – please try again");
                } else {
                    alert(response.responseText);
                }
                console.log("error: " + status + " " + error);
            }
        });
    }

    openDiagram($scope, $compile, taskId: string): void {
        if (!this.isPaletteLoaded) {
            alert("Palette is not loaded!");
            return;
        }
        var diagramSpinner = $('#diagramSpinner');
        diagramSpinner.show();
        var twoDModelSpinner = $('#twoDModelSpinner');
        twoDModelSpinner.show();
        var controller = this;
        $.ajax({
            type: 'POST',
            url: 'open/' + taskId,
            timeout: 60000,
            success: function (response) {
                controller.clear();
                diagramSpinner.hide();
                twoDModelSpinner.hide();
                $scope.$emit("emit2dModelLoad", response.fieldXML);
                controller.diagramLoader.load($scope, $compile, response.diagram, controller.nodesMap,
                    controller.linksMap, controller.nodeTypesMap);
            },
            error: function (response, status, error) {
                diagramSpinner.hide();
                twoDModelSpinner.hide();
                alert("error: " + status + " " + error);
                console.log("error: " + status + " " + error);
            }
        });
    }
}