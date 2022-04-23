window['lego-ev3-m-motor_init'] = function (tab, device)
{
	if (device.image)
		document.getElementById(tab.id + '_' + device.id + '_box').style.backgroundImage = "url('" + device.image + "')"
	else
		document.getElementById(tab.id + '_' + device.id + '_box').style.backgroundImage = "url('/modules/lego-ev3-m-motor/image.png')"
	document.getElementById(tab.id + '_' + device.id + '_friendly_name').innerText = device.friendly_name || device.id
	document.getElementById(tab.id + '_' + device.id + '_stop_action').value = device.stop_action
	document.getElementById(tab.id + '_' + device.id + '_ramp').value = device.ramp_up_sp
	document.getElementById(tab.id + '_' + device.id + '_speed_sp').min = -device.max_speed
	document.getElementById(tab.id + '_' + device.id + '_speed_sp').max = device.max_speed
	document.getElementById(tab.id + '_' + device.id + '_speed_sp').value = device.speed_sp
	document.getElementById(tab.id + '_' + device.id + '_speed_sp_value').innerText = device.speed_sp
}

window['lego-ev3-m-motor_update'] = function(tab, device)
{
	document.getElementById(tab.id + '_' + device.id + '_speed_value').innerText = device.speed
	document.getElementById(tab.id + '_' + device.id + '_position_value').innerText = device.position
	document.getElementById(tab.id + '_' + device.id + '_state_value').innerText = device.state	
}