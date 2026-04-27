import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response-viewer',
  standalone: true,
  imports: [],
  template: ` <pre class="response-content">{{ response }}</pre> `,
  styles: [
    `
      .response-content {
        background: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        font-size: 12px;
        overflow-x: auto;
        max-height: 300px;
        overflow-y: auto;
        color: #333;
      }
    `,
  ],
})
export class ResponseViewerComponent {
  @Input() response: any;
}
