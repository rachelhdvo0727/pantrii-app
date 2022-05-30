import React from 'react';
import generalStyles from '../styles/General';
// Components
import {
    StyleSheet,
    StyleProp,
    ViewStyle,
    Text,
    View,
    PressableProps,
} from 'react-native';
import IconButton from './actions/IconButton';

export interface SectionInInformationCardProps {
    sectionTitle: string;
    sectionStyle?: StyleProp<ViewStyle>;
    sectionContent?:
        | React.Component
        | React.ReactNode
        | React.ReactChildren
        | React.ReactChild;
    isTopSection?: boolean;
    isLastSection?: boolean;
    isEditable?: boolean;
    onEdit?: React.ComponentProps<typeof IconButton>['onPress'];
    iconButtonStyle?: StyleProp<PressableProps>;
}

const SectionInInformationCard = ({
    sectionTitle,
    sectionStyle,
    sectionContent,
    isTopSection,
    isLastSection,
    isEditable,
    onEdit,
    iconButtonStyle,
}: SectionInInformationCardProps) => {
    return (
        <View
            style={[
                styles.sectionContainer,
                isTopSection && styles.topSectionSpacing,
                isLastSection && styles.lastSection,
                isEditable && styles.flexWithButton,
                sectionStyle,
            ]}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.sectionHeader}>{sectionTitle}</Text>
                {sectionContent}
            </View>
            {isEditable ? (
                <IconButton
                    arrowRight
                    title="Redigér"
                    onPress={onEdit}
                    isActive={isEditable}
                    iconButtonStyle={iconButtonStyle}
                ></IconButton>
            ) : null}
        </View>
    );
};

export default SectionInInformationCard;

const styles = StyleSheet.create({
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(189, 189, 189, 0.5)',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        ...generalStyles.headerH3,
        marginBottom: 5,
        marginTop: 3,
    },
    topSectionSpacing: { marginTop: 10 },
    contentContainer: {
        flexDirection: 'column',
    },
    lastSection: {
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    flexWithButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
});
