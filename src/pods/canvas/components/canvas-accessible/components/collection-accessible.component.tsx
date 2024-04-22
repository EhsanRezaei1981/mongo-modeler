import React from 'react';
import { FieldList } from './field-list-accessible.component';
import { TableVm, DatabaseSchemaVm } from '@/core/providers';
import { TableRelationsAccessible } from './table-relations-accessible.component';

interface Props {
  table: TableVm;
  canvasSchema: DatabaseSchemaVm;
  collectionRefs: React.MutableRefObject<{
    [key: string]: React.RefObject<HTMLHeadingElement>;
  }>;
}

export const CollectionAccessible: React.FC<Props> = props => {
  const { table, canvasSchema, collectionRefs } = props;

  return (
    <>
      <h3 ref={collectionRefs.current[table.id]}>
        {table.tableName} collection
        <button type="button">Edit {table.tableName} collection</button>
        <button type="button">Delete {table.tableName} collection</button>
      </h3>
      <h4>Fields for {table.tableName} collection</h4>
      <FieldList fieldList={table.fields} listName={table.tableName} />
      <TableRelationsAccessible
        table={table}
        canvasSchema={canvasSchema}
        collectionRefs={collectionRefs}
      />
    </>
  );
};
