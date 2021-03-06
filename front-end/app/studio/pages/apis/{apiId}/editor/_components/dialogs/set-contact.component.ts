/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Output, EventEmitter, ViewChildren, QueryList} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {Oas20Contact} from "oai-ts-core";


@Component({
    moduleId: module.id,
    selector: "set-contact-dialog",
    templateUrl: "set-contact.component.html"
})
export class SetContactDialogComponent {

    @Output() onContact: EventEmitter<Oas20Contact> = new EventEmitter<Oas20Contact>();

    @ViewChildren("setContactModal") setContactModal: QueryList<ModalDirective>;

    protected _isOpen: boolean = false;

    protected name: string = "";
    protected email: string = "";
    protected url: string = "";

    /**
     * Called to open the dialog.
     */
    public open(contact?: Oas20Contact): void {
        this._isOpen = true;
        this.name = "";
        this.email = "";
        this.url = "";
        if (contact) {
            this.name = contact.name;
            this.email = contact.email;
            this.url = contact.url;
        }

        this.setContactModal.changes.subscribe( thing => {
            if (this.setContactModal.first) {
                this.setContactModal.first.show();
            }
        });
    }

    /**
     * Called to close the dialog.
     */
    public close(): void {
        this._isOpen = false;
    }

    /**
     * Called when the user clicks "add".
     */
    protected ok(): void {
        let contact: Oas20Contact = new Oas20Contact();
        contact.email = this.email;
        contact.name = this.name;
        contact.url = this.url;
        this.onContact.emit(contact);
        this.cancel();
    }

    /**
     * Called when the user clicks "cancel".
     */
    protected cancel(): void {
        this.setContactModal.first.hide();
    }

    /**
     * Returns true if the dialog is open.
     * @return {boolean}
     */
    public isOpen(): boolean {
        return this._isOpen;
    }

}
