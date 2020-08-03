import {Directive, HostListener, OnInit} from '@angular/core';

@Directive({
    selector: '[disabled-input]'
})
export class DisabledInputDirective implements OnInit {

    @HostListener('disabled')
    disabled: boolean;

    ngOnInit(): void {
        console.log(`in directive: ${this.disabled}`);
    }

}
