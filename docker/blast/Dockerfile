FROM node:8.6.0
WORKDIR /patsnap
RUN  cd /patsnap && mkdir blastdb
COPY blast.tar .
RUN touch blast.tar && tar xvpf  blast.tar && rm blast.tar
RUN mv ncbi-blast-2.6.0+  blast
ENV PATH $PATH:/patsnap/blast/bin
ENV BLASTDB /patsnap/blastdb
