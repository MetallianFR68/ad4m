export default class lego_ev3_brick
{
	constructor(tab)
	{
		this.devices = new Array();
		this.update = {global: true, motors: true, sensors: true}
		this.tab = tab
	}

	init()
	{
		Promise.all(
		[
			//this.populate_devices(this.tab, 'motors'), 
			this.populate_devices(this.tab, 'sensors'), 
			this.populate_devices(this.tab, 'usbports'), 
			this.populate_devices(this.tab, 'leds')
		])
		.then(() => 
		{
			Promise.all(
			[
				...[...new Set(this.devices.map(device => device.group))].map(group => load_component('common-'+group, '0')),
			])
			.then(() => 
			{
				[...new Set(this.devices.map(device => device.group))].map(group => document.querySelector('#' + this.tab.id + '_' + group).innerHTML += templates['common-'+group].replace(/{{TAB_ID}}/g, this.tab.id).replace(/{{GROUP_ID}}/g, '0')),
				Promise.all(
				[
					...this.devices.map(device => load_component(device.driver_name, device.id)),
				])
				.then(() =>
				{
					for (let device of this.devices)
						document.querySelector('#' + this.tab.id + '_' + device.group + '_0_columns').innerHTML += templates[device.driver_name].replace(/{{TAB_ID}}/g, this.tab.id).replace(/{{DEVICE_ID}}/g, device.id).replace(/{{PORT_NUMBER}}/g, device.group == 'motors' ? device.port + 4 : device.port).replace(/{{PORT_NAME}}/g, String.fromCharCode(65 + device.port))
				})
				.then(() => 
				{
					for (let device of this.devices)
						window[this.tab.id][device.id] = new window.classes[device.driver_name](this.tab, device)
					
					window[this.tab.id]['common-sensors'] = new window.classes['common-sensors'](this.tab)
					window[this.tab.id]['common-sensors'].update()
				})
			})
			
		})
		.catch(error => bulmaToast.toast({message: 'Error initiating<br/>' + error.toString(), type: 'is-warning', position: 'bottom-right', duration: 5000, dismissible: true, pauseOnHover: true}))
	}


	populate_devices(tab, type)
	{
		console.log(tab.url + '/' + type + '_init.php')
		return fetch(tab.url + '/' + type + '_init.php')
		.then(response => response.json())
		.then(response => 
		{
			if (response)
				for (let device of response)
				{
					device.group = type
					window[tab.id].devices.push(device)
				}
		})
		.catch(error => {bulmaToast.toast({message: 'Error populating ' + type + '<br/>' + error.toString(), type: 'is-warning', position: 'bottom-right', duration: 5000, dismissible: true, pauseOnHover: true})})
	}



	send(device, parameter, value)
	{
		return fetch(this.tab.url +'/write.php?device='+device+'&parameter='+parameter+'&value='+value)
		.then(response => response.json())
		.then(response =>
		{
			if (response.status == 200)
				return response
			else
				throw 'Error ' + response.status + '<br/>' + response.message
		})
		.catch(error => bulmaToast.toast({message: error.toString(), type: 'is-danger', position: 'bottom-right', duration: 5000, dismissible: true, pauseOnHover: true}))
	}
}

