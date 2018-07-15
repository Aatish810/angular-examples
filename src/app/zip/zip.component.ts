import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) {  }

  public zipFile: JSZip = new JSZip();

  ngOnInit() {
  }

  onFileSelect(event) {
    const fileList: FileList = event.target.files;
     this.convertFileToBase64AndSet(fileList);
    }

    convertFileToBase64AndSet(fileList) {
      if (fileList.length > 0) {
        fileList[0]['docType'] = fileList[0].type;
        fileList[0]['fileName'] = fileList['name'];
        const file = fileList[0];
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileList[0])));
        this.createZip(fileList[0], file);
      }
    }

    createZip(fileList, binaryArrayBlob) {
     this.zipFile.folder('Document Zip').file(fileList.name, binaryArrayBlob);
      this.zipFile.generateAsync({type: 'blob'})
      .then(function (blob) {
           FileSaver.saveAs(blob, 'Document-Zip.zip');
      });
    }

}
