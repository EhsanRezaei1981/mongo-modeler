import React from 'react';
import {
  useCanvasViewSettingsContext,
  useModalDialogContext,
} from '@/core/providers';
import { GUID, Size } from '@/core/model';
import { mockSchema } from './canvas.mock.data';
import classes from './canvas.pod.module.css';
import {
  RelationVm,
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { EditTablePod } from '../edit-table';
import {
  EDIT_RELATION_TITLE,
  EDIT_TABLE_TITLE,
} from '@/common/components/modal-dialog';
import { CanvasSvgComponent } from './canvas-svg.component';
import { EditRelationPod } from '../edit-relation';

export const CanvasPod: React.FC = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const {
    canvasSchema,
    loadSchema,
    updateTablePosition,
    updateFullTable,
    doFieldToggleCollapse,
    doSelectElement,
    updateFullRelation,
  } = useCanvasSchemaContext();
  const { canvasViewSettings, setScrollPosition } =
    useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;
  // TODO: This is temporary code, once we get load and save
  // we won't need to load this mock data
  React.useEffect(() => {
    loadSchema(mockSchema);
  }, []);

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize]
  );

  const handleToggleCollapse = (tableId: GUID, fieldId: GUID) => {
    doFieldToggleCollapse(tableId, fieldId);
  };

  const handleTableEditUpdate = (table: TableVm) => {
    updateFullTable(table);
    closeModal();
  };

  const handleEditTable = (tableInfo: TableVm) => {
    openModal(
      <EditTablePod
        table={tableInfo}
        relations={canvasSchema.relations}
        onSave={handleTableEditUpdate}
      />,
      EDIT_TABLE_TITLE
    );
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      });
    }
  };

  const handleChangeRelation = (relation: RelationVm) => {
    updateFullRelation(relation);
    closeModal();
  };

  const handleEditRelation = (relationId: GUID) => {
    openModal(
      <EditRelationPod
        onChangeRelation={handleChangeRelation}
        canvasSchema={canvasSchema}
        relationId={relationId}
      />,
      EDIT_RELATION_TITLE
    );
  };

  const onSelectElement = (relationId: GUID | null) => {
    doSelectElement(relationId);
  };

  return (
    <div
      className={classes.container}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <CanvasSvgComponent
        viewBoxSize={viewBoxSize}
        canvasSize={canvasSize}
        canvasSchema={canvasSchema}
        onUpdateTablePosition={updateTablePosition}
        onToggleCollapse={handleToggleCollapse}
        onEditTable={handleEditTable}
        onEditRelation={handleEditRelation}
        onSelectElement={onSelectElement}
      />
    </div>
  );
};
