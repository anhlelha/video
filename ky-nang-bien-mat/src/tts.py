import sys, certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts.communicate as c
if hasattr(c, "certifi"): c.certifi.where = certifi.where
import ssl
c._SSL_CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt") if hasattr(c, "_SSL_CTX") else None
from edge_tts.util import main
sys.exit(main())
