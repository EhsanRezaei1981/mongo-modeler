import { GUID } from '@/core/model';
import { DatabaseSchemaVm } from '../canvas-schema.model';
import { deleteItemFromCanvasSchema } from '../canvas.business';

describe('deleteItemFromCanvasSchema', () => {
  it('should delete the table with selectedId and relations that the table has', () => {
    //Arrange
    const selectedElementId: GUID = '1';
    const dbSchema: DatabaseSchemaVm = {
      selectedElementId: null,
      relations: [
        {
          id: '20',
          fromFieldId: '11',
          fromTableId: '1',
          toFieldId: '2',
          toTableId: '21',
          type: '1:1',
        },
        {
          id: '30',
          fromFieldId: '12',
          fromTableId: '1',
          toFieldId: '2',
          toTableId: '22',
          type: '1:1',
        },
      ],
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '11',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '12',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 20,
          y: 6,
        },
        {
          id: '2',
          fields: [
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 100,
          y: 200,
        },
      ],
    };

    //Act
    const result = deleteItemFromCanvasSchema(dbSchema, selectedElementId);

    //Assert
    const expected = {
      selectedElementId: null,
      relations: [],
      tables: [
        {
          id: '2',
          fields: [
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 100,
          y: 200,
        },
      ],
    };
    expect(result).toEqual(expected);
  });
  it('should delete the relation with selectedId', () => {
    //Arrange
    const selectedElementId: GUID = '20';
    const dbSchema: DatabaseSchemaVm = {
      selectedElementId: null,
      relations: [
        {
          id: '20',
          fromFieldId: '11',
          fromTableId: '1',
          toFieldId: '2',
          toTableId: '21',
          type: '1:1',
        },
        {
          id: '30',
          fromFieldId: '12',
          fromTableId: '1',
          toFieldId: '2',
          toTableId: '22',
          type: '1:1',
        },
      ],
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '11',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '12',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 20,
          y: 6,
        },
        {
          id: '2',
          fields: [
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 100,
          y: 200,
        },
      ],
    };

    //Act
    const result = deleteItemFromCanvasSchema(dbSchema, selectedElementId);

    //Assert
    const expected = {
      selectedElementId: null,
      relations: [
        {
          id: '30',
          fromFieldId: '12',
          fromTableId: '1',
          toFieldId: '2',
          toTableId: '22',
          type: '1:1',
        },
      ],
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '11',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '12',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 20,
          y: 6,
        },
        {
          id: '2',
          fields: [
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
            {
              id: '21',
              name: 'test name',
              PK: true,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 100,
          y: 200,
        },
      ],
    };
    expect(result).toEqual(expected);
  });
});
