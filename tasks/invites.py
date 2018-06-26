from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
# from django.template import Context

def send_invite(receiver, workspace_name, code):
    plaintext = get_template('invite.txt')
    htmly = get_template('invite.html')

    d = { 'workspace_name': workspace_name, 'code': code }
    subject, from_email, to = 'Join a Temporalite Workspace', 'donotreply@temporalite.com', receiver
    text_content = plaintext.render(d)
    html_content = htmly.render(d)
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send() 