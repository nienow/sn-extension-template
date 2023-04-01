import {REGISTERED_EVENT, STREAM_EVENT_DATA} from './mock-events';

export class MockStandardNotes {
  private childWindow;
  private streamEvent;
  private streamData;

  constructor(text: string, private onSave: () => void) {
    this.updateStream(text);
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  public onReady(childWindow) {
    this.childWindow = childWindow;
    childWindow.postMessage(REGISTERED_EVENT);
  }

  public toggleLock(isLocked: boolean) {
    this.streamData.item.content.appData['org.standardnotes.sn']['locked'] = isLocked;
    this.childWindow.postMessage({
      action: 'reply',
      data: this.streamData,
      original: this.streamEvent
    }, '*');
  }

  public changeData(text: string) {
    this.updateStream(text);
    this.childWindow.postMessage({
      action: 'reply',
      data: this.streamData,
      original: this.streamEvent
    }, '*');
  }

  private handleMessage(e: MessageEvent) {
    const data = e.data;
    console.log('mock: ', data);
    if (data.action === 'stream-context-item') {
      this.streamEvent = data;
      this.childWindow.postMessage({
        action: 'reply',
        data: this.streamData,
        original: data
      }, '*');
    } else if (data.action === 'save-items') {
      this.onSave();
      this.childWindow.postMessage({
        action: 'reply',
        data: {},
        original: data
      }, '*');
    }
  }

  private updateStream(text: string) {
    this.streamData = JSON.parse(JSON.stringify(STREAM_EVENT_DATA));
    this.streamData.item.content.text = text;
  }
}
