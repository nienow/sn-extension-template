import {MyEditorMeta} from '../definitions';

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
  text: 'This is the note content for the small example',
  meta: {
    rows: 3
  }
};

export const LARGE = {
  title: 'Large',
  text: 'This is the note content for the large example',
  meta: {
    rows: 10
  }
};

export const TEST_DATA: TestData[] = [SMALL, LARGE, EMPTY];