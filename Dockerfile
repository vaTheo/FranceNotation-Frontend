FROM pierrezemb/gostatic

# Copy only the build directory
COPY build /srv/http/

CMD ["-port","8080","-https-promote", "-enable-logging"]