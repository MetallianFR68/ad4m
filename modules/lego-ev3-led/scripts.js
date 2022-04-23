export default class lego_ev3_led
{
	constructor(tab, device)
	{
		this.id = device.id
		this.tab = tab
		this.slider = document.getElementById(tab.id + '_' + device.id + '_slider')
		this.friendly_name = document.getElementById(tab.id + '_' + device.id + '_friendly_name')
		this.icon = document.getElementById(tab.id + '_' + device.id + '_icon')

		this.friendly_name.innerText = device.friendly_name || device.id
		this.slider.value = device.value

		if (device.address.includes('red'))
		{
			this.icon.classList.add('has-text-danger')
			this.slider.classList.add('is-danger')
		}	
		else
		{
			this.icon.classList.add('has-text-success')
			this.slider.classList.add('is-success')
		}
		this.icon.style.opacity = (parseInt(device.value)+45) / 300
	}

	click()
	{
		this.slider.value = (Math.round(this.slider.value)==0 ? 1 : 0) * 255
		this.slider.onchange()
	}

	slider_change()
	{
		window[this.tab.id].send(this.id, 'set_brightness', this.slider.value)
		this.icon.style.opacity = (parseInt(this.slider.value)+45) / 300
	}
}