export default class usb_amazon_HU9002V1EBL
{
	constructor(tab, device)
	{
		this.id = device.id
		this.tab = tab
		this.value = device.value
		this.friendly_name = document.getElementById(tab.id + '_' + device.id + '_friendly_name')
		this.friendly_name.innerText = device.friendly_name || device.id
		this.image = document.getElementById(tab.id + '_' + device.id + '_image')
		this.image.src = device.image || 'images/blank.png'
		this.checkbox = document.getElementById(tab.id + '_' + device.id + '_checkbox')
		if (device.readonly == 1)
			this.checkbox.disabled = true
		this.image.style.opacity = device.value==1 ? 1 : 0.3
		this.checkbox.checked = (device.value==1) ? true : false
	}

	usb_switch(value)
	{
		window[this.tab.id].send(this.id, 'set', value ? 1 : 0);
		document.getElementById(this.tab.id+'_'+this.id+'_image').style.opacity = value ? 1 : 0.3
	}
}