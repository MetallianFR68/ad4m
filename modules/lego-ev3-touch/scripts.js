export default class lego_ev3_touch
{
	constructor(tab, device)
	{
		this.id = device
		this.tab = tab

		this.friendly_name = document.getElementById(tab.id + '_' + device.id + '_friendly_name')
		this.friendly_name.innerText =  device.friendly_name || device.id
		
		this.image = document.getElementById(tab.id + '_' + device.id + '_image')
		this.image.src = device.image || 'modules/lego-ev3-touch/image.png'

		this.checkbox = document.getElementById(tab.id + '_' + device.id + '_checkbox')
	}

	update(values)
	{
		this.checkbox.checked = values[0] == 1 ? true : false
	}
}