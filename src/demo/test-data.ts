import {MyEditorMeta} from '../providers/EditorProvider';

export interface TestData {
  title: string;
  text: string;
  meta?: MyEditorMeta;
}

export const EMPTY = {
  title: 'Empty',
  text: ''
};
export const SMALL = {
  title: 'Small',
  text: 'My small editor',
  meta: {
    rows: 3
  }
};

export const LARGE = {
  title: 'Large',
  text: 'My large editor',
  meta: {
    rows: 10
  }
};

export const TEST_DATA: TestData[] = [SMALL, LARGE, EMPTY];
