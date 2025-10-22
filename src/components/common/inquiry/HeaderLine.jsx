export const HeaderLine = ({ userType }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold">
                {userType === 'seller' ? 'Property Inquiries' :
                    userType === 'buyer' ? 'My Inquiries' : 'All Inquiries'}
            </h1>
            <p className="text-muted-foreground">
                {userType === 'seller' ? 'Manage and respond to buyer inquiries' :
                    userType === 'buyer' ? 'Track your property inquiries' :
                        'Manage all system inquiries'}
            </p>
        </div>
    );
}