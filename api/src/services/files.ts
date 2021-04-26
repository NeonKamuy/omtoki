import { Injectable } from "@nestjs/common";
import { ObjectId } from "bson";
import Fs from "fs";
import { base64ToFileBuffer } from "src/utils/base64-to-file-buffer";

@Injectable()
export default class FileService {
  public async saveFromBase64(
    base64: string,
    subFolder?: string
  ): Promise<string> {
    return new Promise((res, rej) => {
      const buffer = base64ToFileBuffer(base64);
      const filename =
        (subFolder && subFolder + "/") + new ObjectId().toHexString();
      Fs.writeFile(`/uploads/${filename}`, buffer, (err) => {
        if (err) rej(err);
        res(filename);
      });
    });
  }

  public async deleteMany(paths: string[]): Promise<void> {
    const promises = paths.map((e) => Fs.unlink(e, () => {}));
    await Promise.all(promises);
  }
}
