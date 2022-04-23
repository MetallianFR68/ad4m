export default class lego_ev3_color
{
	constructor(tab, device)
	{
		this.id = device.id
		this.tab = tab

		this.friendly_name = document.getElementById(tab.id + '_' + device.id + '_friendly_name')
		this.friendly_name.innerText =  device.friendly_name || device.id
		
		this.image = document.getElementById(tab.id + '_' + device.id + '_image')
		this.image.src = device.image || 'modules/lego-ev3-color/image.png'

		this.value0 = document.getElementById(tab.id + '_' + device.id + '_value0')
		this.value1 = document.getElementById(tab.id + '_' + device.id + '_value1')
		this.value2 = document.getElementById(tab.id + '_' + device.id + '_value2')

		this.modes =['COL-REFLECT', 'COL-AMBIENT', 'COL-COLOR', 'REF-RAW', 'RGB-RAW'];
		this.colors = ['none','black','blue','green','yellow','red','white','brown']
		this.colors_rgb = ['transparent','#000000','#0055BF','#237841','#F2CD37','#C91A09','#FFFFFF','#583927']

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
		if (this.mode == 'COL-COLOR')
		{
			this.value1.value = this.colors[values[0]]
			this.value2.value = ''
			this.value2.style.backgroundColor = this.colors_rgb[values[0]]
		}
			
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
		this.value2.style.backgroundColor = '';

		if (this.mode == 'REF-RAW' || this.mode == 'RGB-RAW' || this.mode == 'COL-COLOR')
			this.value1.parentNode.classList.remove('is-hidden')
		if (this.mode == 'COL-COLOR' || this.mode == 'RGB-RAW')
			this.value2.parentNode.classList.remove('is-hidden')
	}

}