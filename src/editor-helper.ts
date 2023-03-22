import ComponentRelay from '@standardnotes/component-relay';
import type {DecryptedTransferPayload, NoteContent, OutgoingItemMessagePayload} from '@standardnotes/models';
import {AppDataField} from '@standardnotes/models';

type NoteMessagePayload = DecryptedTransferPayload<NoteContent> & OutgoingItemMessagePayload<NoteContent>

export default class EditorHelper {
  private componentRelay?: ComponentRelay;
  private note?: NoteMessagePayload;

  public connect(setRawTextFn: (text: string, locked: boolean) => void) {
    this.componentRelay = new ComponentRelay({
      targetWindow: window,
      options: {
        coallesedSaving: true,
        coallesedSavingDelay: 400,
      }
    });

    this.componentRelay.streamContextItem(async (note: NoteMessagePayload) => {
      this.note = note;
      // Only update UI on non-metadata updates.
      if (note.isMetadataUpdate) {
        return;
      }
      const text = note.content?.text || '';
      const locked = this.componentRelay.getItemAppDataValue(note, AppDataField.Locked);
      setRawTextFn(text, locked);
    });
  }

  public save(text: string, preview?: string): void {
    this.componentRelay!.saveItemWithPresave(this.note as any, () => {
      this.note.content.text = text;
      this.note.content.preview_plain = preview || '';
    });
  }
}
