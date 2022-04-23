window['lego-ev3-ir_init'] = function (tab, device)
{
	
}

window['lego-ev3-ir_update'] = function(tab, device)
{
	for (i=0; i<8; i++)
		document.getElementById(tab.id + '_' + device.id + '_value'+i).value = device?.values[i]
}

function lego_ev3_ir_change_mode(obj)
{
	send(obj, 'mode', obj.value)
	devices[devices.map((device) => device.id).indexOf(obj.id.split('_')[1])].mode = obj.value

	for (i=1; i<8; i++)
		document.getElementById(obj.id.replace('mode','value'+i)).parentNode.style.display = 'none'

	if (obj.value == 'IR-SEEK' || obj.value == 'IR-REMOTE')
	{
		document.getElementById(obj.id.replace('mode','value1')).parentNode.style.display = ''
		document.getElementById(obj.id.replace('mode','value2')).parentNode.style.display = ''
		document.getElementById(obj.id.replace('mode','value3')).parentNode.style.display = ''
	}
	if (obj.value == 'IR-SEEK')
	{
		document.getElementById(obj.id.replace('mode','value4')).parentNode.style.display = ''
		document.getElementById(obj.id.replace('mode','value5')).parentNode.style.display = ''
		document.getElementById(obj.id.replace('mode','value6')).parentNode.style.display = ''
		document.getElementById(obj.id.replace('mode','value7')).parentNode.style.display = ''
	}
}

export default class lego_ev3_ir
{
	constructor(tab, device)
	{
		this.id = device.id
		this.tab = tab

		this.friendly_name = document.getElementById(tab.id + '_' + device.id + '_friendly_name')
		this.friendly_name.innerText =  device.friendly_name || device.id
		
		this.image = document.getElementById(tab.id + '_' + device.id + '_image')
		this.image.src = device.image || 'modules/lego-ev3-ir/image.png'

		this.value0 = document.getElementById(tab.id + '_' + device.id + '_value0')
		this.value1 = document.getElementById(tab.id + '_' + device.id + '_value1')
		this.value2 = document.getElementById(tab.id + '_' + device.id + '_value2')
		this.value3 = document.getElementById(tab.id + '_' + device.id + '_value3')
		this.value4 = document.getElementById(tab.id + '_' + device.id + '_value4')
		this.value5 = document.getElementById(tab.id + '_' + device.id + '_value5')
		this.value6 = document.getElementById(tab.id + '_' + device.id + '_value6')
		this.value7 = document.getElementById(tab.id + '_' + device.id + '_value7')

		this.modes =['IR-PROX', 'IR-SEEK', 'IR-REMOTE'];
		this.modes_select = document.getElementById(tab.id + '_' + device.id + '_modes_select')
		for (let mode of this.modes)
			this.modes_select.add(new Option(mode, mode, null, mode==device.mode))
		this.mode = device.mode
		this.update_display()
	}

	update(values)
	{
		this.value0.value = values[0]
		this.value1.value = values[1]
		this.value2.value = values[2]
		this.value3.value = values[3]
		this.value4.value = values[4]
		this.value5.value = values[5]
		this.value6.value = values[6]
		this.value7.value = values[7]
	}

	change_mode(new_mode)
	{
		if (new_mode != this.mode)
			window[this.tab.id].send(this.id, 'mode', new_mode)
			.then(response => 
			{
				this.mode = new_mode
				this.update_display()
			})
	}

	update_display()
	{
		this.modes_select.value = this.mode

		this.value1.parentNode.classList.add('is-hidden')
		this.value2.parentNode.classList.add('is-hidden')
		this.value3.parentNode.classList.add('is-hidden')
		this.value4.parentNode.classList.add('is-hidden')
		this.value5.parentNode.classList.add('is-hidden')
		this.value6.parentNode.classList.add('is-hidden')
		this.value7.parentNode.classList.add('is-hidden')
		
		if (this.mode == 'IR-SEEK' || this.mode == 'IR-REMOTE')
		{
			this.value1.parentNode.classList.remove('is-hidden')
			this.value2.parentNode.classList.remove('is-hidden')
			this.value3.parentNode.classList.remove('is-hidden')
		}
		if (this.mode == 'IR-SEEK')
		{
			this.value4.parentNode.classList.remove('is-hidden')
			this.value5.parentNode.classList.remove('is-hidden')
			this.value6.parentNode.classList.remove('is-hidden')
			this.value7.parentNode.classList.remove('is-hidden')
		}
			
	}

}