import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { BankInfo } from './models/bankInfo';
import { UtilityService } from './utility.service';

@Directive({
  selector: '[appAccountLookup]'
})
export class AccountLookupDirective {
  @Input('appAccountLookup') bankDetails!:BankInfo;
  defaultActionText: string = 'Verify Account';
  loadingActionText: string = 'Verifying...';
  actionButton!: HTMLElement

  constructor(private renderer: Renderer2, private el: ElementRef, private utilityService: UtilityService){
    this.modifyField();
  }


  private modifyField():void {
    // Set style of parent
    const parent =  this.renderer.parentNode(this.el.nativeElement)
    this.renderer.setStyle(parent, 'position', 'relative');
    // Create action element inside the input field
    const actionButton = this.renderer.createElement('span');
    this.renderer.addClass(actionButton, 'inside__input--button');
    this.renderer.setProperty(actionButton,'innerHTML',this.defaultActionText);
    actionButton.addEventListener('click', (event:any) => {
    // Subscription to method that will fetch the account name
    this.verifyAccountDetails(actionButton, parent);
    console.log('clicked');
    });
   
   
    this.renderer.appendChild(parent, actionButton);
    };

    private verifyAccountDetails(actionButton: HTMLElement,  parent:HTMLElement){
      this.renderer.setProperty(actionButton,'innerHTML',this.loadingActionText);
        const accountNameDisplay = this.renderer.createElement('span');
        this.renderer.addClass(accountNameDisplay, 'result__under--text');
        this.renderer.appendChild(parent, accountNameDisplay);
       this.utilityService.validateAccount(this.bankDetails)
       .subscribe((resp)=> {
      this.renderer.setProperty(accountNameDisplay,'innerHTML', resp.accountName);
      actionButton.innerHTML = this.defaultActionText;
      },
       (error: any)=> {
        actionButton.innerHTML = this.defaultActionText;
         console.log(error);
        })
       }  
}
