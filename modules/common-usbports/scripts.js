export default class common_usbports
{
	constructor(tab, device)
	{
		this.id = device
		this.tab = tab
	}

	usb_switch_all(tab, value)
	{
		for (input of document.querySelectorAll('#' + this.tab.id + '_usbports input'))
			if (input.disabled == false)
				window[tab.id].usb_switch(value)
			{
				send(input, 'set', value)
				input.checked = (value==0) ? false : true
				document.getElementById(input.id.replace('checkbox','image')).style.opacity = value==1 ? 1 : 0.3
			}
	}
}