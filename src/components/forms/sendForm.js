/**
 * Created by ITUA on 20.06.2017.
 */
module.exports = function (data) {
	return new Promise((resolve, reject) => {
		// принять
		setTimeout(() => {
			resolve(data);
		}, parseInt(Math.random() * 3000 + 500));
		
		// отклонить
		setTimeout(() => {
			reject('Что-то пошло не так!');
		}, parseInt(Math.random() * 6000 + 500));
	});
};