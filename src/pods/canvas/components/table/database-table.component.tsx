// Importaciones necesarias
import React from 'react';
import { GUID, Size } from '@/core/model';
import {
  FieldVm,
  TableVm,
  UpdatePositionFn,
} from '@/core/providers/canvas-schema';
import classes from './database-table.module.css';
import { useDraggable } from './table-drag.hook';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import { DatabaseTableRow } from './database-table-row.component';
import { TruncatedText } from './truncated-text.component';

// TODO: We should add an optional field to indicate FONT_SIZE in case we override the standard class
// TODO: There's is a solution more elaborated (using JS) to show elipsis ... if text is too long
interface Props {
  tableInfo: TableVm;
  updatePosition: UpdatePositionFn;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
  canvasSize: Size;
  isSelected: boolean;
  selectTable: (tableId: GUID) => void;
}

const HEADER_TITLE_GAP = 15;
const TITLE_MARGIN_LEFT = 10;

export const DatabaseTable: React.FC<Props> = ({
  tableInfo,
  onEditTable,
  updatePosition,
  onToggleCollapse,
  canvasSize,
  isSelected,
  selectTable,
}) => {
  const rowHeight = TABLE_CONST.FONT_SIZE + TABLE_CONST.ROW_PADDING;

  const renderRows = (
    fields: FieldVm[],
    level: number,
    startY: number
  ): [JSX.Element[], number] => {
    let currentY = startY;
    let rows: JSX.Element[] = [];

    fields.forEach(field => {
      const isExpanded = !field.isCollapsed;

      const row = (
        <DatabaseTableRow
          key={field.id}
          field={field}
          tableInfo={tableInfo}
          level={level}
          currentY={currentY}
          onToggleCollapse={onToggleCollapse}
        />
      );

      rows.push(row);
      currentY += rowHeight;

      if (isExpanded && field.children) {
        const [childRows, newY] = renderRows(
          field.children,
          level + 1,
          currentY
        );
        rows = rows.concat(childRows);
        currentY = newY;
      }
    });

    return [rows, currentY];
  };

  const [renderedRows, totalHeight] = React.useMemo((): [
    JSX.Element[],
    number,
  ] => {
    const [rows, totalY] = renderRows(
      tableInfo.fields,
      0,
      TABLE_CONST.HEADER_HEIGHT
    );
    return [rows, totalY + TABLE_CONST.ROW_PADDING]; // Ajuste para el padding final
  }, [tableInfo.fields]);

  const { onMouseDown } = useDraggable(
    tableInfo.id,
    tableInfo.x,
    tableInfo.y,
    updatePosition,
    totalHeight,
    canvasSize
  );

  const rectStyle = {
    filter: isSelected ? 'url(#table_component_selected)' : 'none', // Aplica el filtro si está seleccionado
  };

  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    selectTable(tableInfo.id);
    e.stopPropagation();
  };

  const handleDoubleClick = () => {
    onEditTable(tableInfo);
  };
  return (
    <g
      transform={`translate(${tableInfo.x}, ${tableInfo.y})`}
      onMouseDown={onMouseDown}
      className={classes.tableContainer}
      onClick={handleClick}
    >
      <defs>
        <filter id="table_component_selected" x="0" y="0">
          <feDropShadow dx="5" dy="5" stdDeviation="2" />
        </filter>
      </defs>
      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + HEADER_TITLE_GAP}
        className={classes.tableBackground}
        style={rectStyle}
      />
      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={TABLE_CONST.HEADER_HEIGHT}
        className={classes.tableHeader}
        onDoubleClick={handleDoubleClick}
      />

      <TruncatedText
        text={tableInfo.tableName}
        x={TITLE_MARGIN_LEFT}
        y={0}
        width={TABLE_CONST.TABLE_WIDTH - TITLE_MARGIN_LEFT}
        height={TABLE_CONST.FONT_SIZE}
        textClass={classes.tableText}
      />

      <g transform={`translate(0, ${HEADER_TITLE_GAP})`}>{renderedRows}</g>

      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + HEADER_TITLE_GAP}
        className={classes.table}
      />
    </g>
  );
};
