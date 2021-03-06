"""empty message

Revision ID: ee6a0f7519b7
Revises: c7857261851c
Create Date: 2022-02-20 00:36:00.513234

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee6a0f7519b7'
down_revision = 'c7857261851c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transactions', 'timestamp')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transactions', sa.Column('timestamp', sa.NUMERIC(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
