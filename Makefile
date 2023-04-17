build:
	docker build -t wirelos/shoutbox .

run:
	docker run -it --rm -p 3000:3000 wirelos/shoutbox

push:
	docker push wirelos/shoutbox